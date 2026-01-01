import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Load skills.json
  const skillsPath = path.join(__dirname, '..', '2_DATA_DEFINITIONS', 'skills.json');
  const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

  console.log(`📦 Loaded ${skillsData.skillCount} skills from skills.json`);

  // Seed Assessments and their elements
  for (const skill of skillsData.skills) {
    console.log(`\n📝 Seeding skill: ${skill.name} (${skill.category})`);

    // Create Assessment
    const assessment = await prisma.assessment.upsert({
      where: {
        name_framework: {
          name: skill.name,
          framework: skill.category,
        },
      },
      update: {},
      create: {
        name: skill.name,
        description: `${skill.name} assessment from ${skill.category} framework`,
        framework: skill.category,
        active: true,
        version: 1,
      },
    });

    console.log(`   ✓ Assessment created: ${assessment.id}`);

    // Create Assessment Elements (components)
    if (skill.components && skill.components.length > 0) {
      for (let i = 0; i < skill.components.length; i++) {
        const component = skill.components[i];
        await prisma.assessmentElement.upsert({
          where: {
            id: `${assessment.id}_comp_${i}`,
          },
          update: {},
          create: {
            id: `${assessment.id}_comp_${i}`,
            assessmentId: assessment.id,
            name: component.name,
            description: `Age expectancy: ${component.ageExpectancy || 'N/A'}`,
            order: i + 1,
          },
        });
      }
      console.log(`   ✓ ${skill.components.length} components created`);
    }

    // Create Normative Scores
    if (skill.normativeThresholds) {
      const ages = Object.keys(skill.normativeThresholds);
      for (const age of ages) {
        const thresholds = skill.normativeThresholds[age];

        // For standard Vic FMS skills (component-based)
        if (skill.type === 'component') {
          await prisma.normativeScore.create({
            data: {
              assessmentId: assessment.id,
              yearLevel: `Year ${age}`,
              ageYears: parseInt(age),
              gender: null, // Applies to all genders
              beginningThreshold: thresholds.beginning,
              progressingThreshold: thresholds.progressing,
              achievingThreshold: thresholds.achieving,
              excellingThreshold: thresholds.excelling,
            },
          });
        }
      }
      console.log(`   ✓ ${ages.length} normative score rules created`);
    }

    // Handle special cases: ASTS (time-based with gender variants)
    if (skill.id === 'asts') {
      console.log(`   ⚡ Special handling for ASTS (gender-specific)`);
      
      // ASTS has age groups with gender variants
      if (skill.ageGroups) {
        for (const ageGroup of skill.ageGroups) {
          // Girls
          if (ageGroup.girls) {
            await prisma.normativeScore.create({
              data: {
                assessmentId: assessment.id,
                yearLevel: ageGroup.name,
                ageYears: parseInt(ageGroup.name.match(/\d+/)[0]), // Extract first number
                gender: 'FEMALE',
                beginningThreshold: ageGroup.girls.normativeThresholds.beginning,
                progressingThreshold: ageGroup.girls.normativeThresholds.progressing,
                achievingThreshold: ageGroup.girls.normativeThresholds.achieving,
                excellingThreshold: ageGroup.girls.normativeThresholds.excelling,
              },
            });
          }

          // Boys
          if (ageGroup.boys) {
            await prisma.normativeScore.create({
              data: {
                assessmentId: assessment.id,
                yearLevel: ageGroup.name,
                ageYears: parseInt(ageGroup.name.match(/\d+/)[0]),
                gender: 'MALE',
                beginningThreshold: ageGroup.boys.normativeThresholds.beginning,
                progressingThreshold: ageGroup.boys.normativeThresholds.progressing,
                achievingThreshold: ageGroup.boys.normativeThresholds.achieving,
                excellingThreshold: ageGroup.boys.normativeThresholds.excelling,
              },
            });
          }
        }
        console.log(`   ✓ Gender-specific normative scores created`);
      }
    }

    // Handle Routine (rubric-based)
    if (skill.id === 'routine' && skill.rubric) {
      console.log(`   📋 Special handling for Routine (rubric-based)`);
      
      // Create elements for rubric components
      for (let i = 0; i < skill.rubric.components.length; i++) {
        const rubricComp = skill.rubric.components[i];
        await prisma.assessmentElement.upsert({
          where: {
            id: `${assessment.id}_rubric_${i}`,
          },
          update: {},
          create: {
            id: `${assessment.id}_rubric_${i}`,
            assessmentId: assessment.id,
            name: rubricComp,
            description: `Rubric component: ${skill.rubric.scale.join(', ')}`,
            order: i + 1,
          },
        });
      }

      // Create normative scores for each age
      if (skill.normativeThresholds) {
        const ages = Object.keys(skill.normativeThresholds);
        for (const age of ages) {
          const thresholds = skill.normativeThresholds[age];
          await prisma.normativeScore.create({
            data: {
              assessmentId: assessment.id,
              yearLevel: `Year ${age}`,
              ageYears: parseInt(age),
              gender: null,
              beginningThreshold: thresholds.beginning,
              progressingThreshold: thresholds.progressing,
              achievingThreshold: thresholds.achieving,
              excellingThreshold: thresholds.excelling,
            },
          });
        }
        console.log(`   ✓ Rubric normative scores created`);
      }
    }

    // Handle Rock to Stand (binary)
    if (skill.id === 'rock_to_stand') {
      console.log(`   🎯 Special handling for Rock to Stand (binary)`);
      // Binary assessment - no complex normative scores needed
      // Just mark as pass/fail in the UI
    }
  }

  console.log('\n✅ Database seed completed successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Assessments: ${skillsData.skillCount}`);
  console.log(`   - Frameworks: Vic FMS, ASTS, Routine, Rock to Stand`);
  console.log(`   - Normative score rules created for ages 5-12`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
