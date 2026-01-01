#!/usr/bin/env python3
"""
Parse extracted skill markdown files and generate skills.json
Based on analysis of Run, ASTS, Gymnastics, Rock to stand sheets
"""

import json
from pathlib import Path

# Define all skills based on extracted data
# Vic FMS skills (Component-based, 5 components each)
VIC_FMS_SKILLS = {
    "run": {
        "id": "run",
        "name": "Run",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Eyes focused forward", "ageExpectancy": "5y.o"},
            {"name": "Knees bend at lift", "ageExpectancy": "6y.o"},
            {"name": "Arms bend at elbow", "ageExpectancy": "7y.o"},
            {"name": "Contact ground with ball of foot", "ageExpectancy": "8y.o"},
            {"name": "Body leans slightly forward", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 0], "achieving": [1, 1], "excelling": [2, 5]},
            "6": {"beginning": [0, 0], "progressing": [1, 1], "achieving": [2, 2], "excelling": [3, 5]},
            "7": {"beginning": [1, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "8": {"beginning": [2, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "9": {"beginning": [3, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "10": {"beginning": [3, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "11": {"beginning": [3, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "12": {"beginning": [3, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
        }
    },
    "vertical_jump": {
        "id": "vertical_jump",
        "name": "Vertical Jump",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Arms extended down", "ageExpectancy": "5y.o"},
            {"name": "Knees bend to quarter squat", "ageExpectancy": "6y.o"},
            {"name": "Arms swing up forcefully", "ageExpectancy": "7y.o"},
            {"name": "Feet leave ground with symmetrical push", "ageExpectancy": "8y.o"},
            {"name": "Body fully extended in flight", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "leap": {
        "id": "leap",
        "name": "Leap",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Take-off from one foot", "ageExpectancy": "5y.o"},
            {"name": "Knee of leading leg lifts high", "ageExpectancy": "6y.o"},
            {"name": "Back leg extends behind", "ageExpectancy": "7y.o"},
            {"name": "Arms swing for balance", "ageExpectancy": "8y.o"},
            {"name": "Land on opposite foot", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieve": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "dodge": {
        "id": "dodge",
        "name": "Dodge",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Responds to signal quickly", "ageExpectancy": "5y.o"},
            {"name": "Moves head out of path", "ageExpectancy": "6y.o"},
            {"name": "Moves body away from object", "ageExpectancy": "7y.o"},
            {"name": "Quick feet to change direction", "ageExpectancy": "8y.o"},
            {"name": "Maintains balance while evading", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "catch": {
        "id": "catch",
        "name": "Catch",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Eyes follow ball", "ageExpectancy": "5y.o"},
            {"name": "Arms move toward ball", "ageExpectancy": "6y.o"},
            {"name": "Hands cup ball on sides", "ageExpectancy": "7y.o"},
            {"name": "Elbows bend to absorb force", "ageExpectancy": "8y.o"},
            {"name": "Catches with hands only", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "overhand_throw": {
        "id": "overhand_throw",
        "name": "Overhand Throw",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Arm raised to shoulder height", "ageExpectancy": "5y.o"},
            {"name": "Elbow bent at right angle", "ageExpectancy": "6y.o"},
            {"name": "Opposite foot steps forward", "ageExpectancy": "7y.o"},
            {"name": "Hip rotation during release", "ageExpectancy": "8y.o"},
            {"name": "Follow-through across body", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "kick": {
        "id": "kick",
        "name": "Kick",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Balance on non-kicking leg", "ageExpectancy": "5y.o"},
            {"name": "Knee of kicking leg lifts", "ageExpectancy": "6y.o"},
            {"name": "Lower leg extends", "ageExpectancy": "7y.o"},
            {"name": "Contact ball with instep/inside of foot", "ageExpectancy": "8y.o"},
            {"name": "Follow-through for distance/direction", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "punt": {
        "id": "punt",
        "name": "Punt",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Balance on non-kicking leg", "ageExpectancy": "5y.o"},
            {"name": "Ball held at waist", "ageExpectancy": "6y.o"},
            {"name": "Knee of kicking leg lifts", "ageExpectancy": "7y.o"},
            {"name": "Lower leg extends through ball", "ageExpectancy": "8y.o"},
            {"name": "Follow-through in direction of kick", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "bounce": {
        "id": "bounce",
        "name": "Bounce",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Feet shoulder-width apart", "ageExpectancy": "5y.o"},
            {"name": "Knees slightly bent", "ageExpectancy": "6y.o"},
            {"name": "Eyes follow ball", "ageExpectancy": "7y.o"},
            {"name": "Hand pushes ball to waist height", "ageExpectancy": "8y.o"},
            {"name": "Repeats bounce without watching hand", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "two_handed_strike": {
        "id": "two_handed_strike",
        "name": "Two-Handed Strike",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Feet shoulder-width apart", "ageExpectancy": "5y.o"},
            {"name": "Side-on stance to target", "ageExpectancy": "6y.o"},
            {"name": "Hands grip tool firmly", "ageExpectancy": "7y.o"},
            {"name": "Rotate hips and shoulders", "ageExpectancy": "8y.o"},
            {"name": "Follow-through in direction of target", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieving": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    },
    "forehand_strike": {
        "id": "forehand_strike",
        "name": "Forehand Strike",
        "category": "Vic FMS",
        "type": "component",
        "components": [
            {"name": "Feet shoulder-width apart", "ageExpectancy": "5y.o"},
            {"name": "Non-dominant side to net", "ageExpectancy": "6y.o"},
            {"name": "Backswing across body", "ageExpectancy": "7y.o"},
            {"name": "Forward swing with hip rotation", "ageExpectancy": "8y.o"},
            {"name": "Follow-through over shoulder", "ageExpectancy": "9y.o"},
        ],
        "normativeThresholds": {
            "5": {"beginning": [0, 0], "progressing": [0, 1], "achieving": [2, 3], "excelling": [4, 5]},
            "6": {"beginning": [0, 1], "progressing": [2, 2], "achieving": [3, 3], "excelling": [4, 5]},
            "7": {"beginning": [1, 2], "progressing": [3, 3], "achieving": [4, 4], "excelling": [5, 5]},
            "8": {"beginning": [2, 3], "progressing": [4, 4], "achieve": [5, 5], "excelling": None},
            "9": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "10": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "11": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
            "12": {"beginning": [3, 4], "progressing": [5, 5], "achieving": None, "excelling": None},
        }
    }
}

# ASTS (Age-Appropriate Sprint Time Standard) - Time-based
ASTS_SKILL = {
    "asts": {
        "id": "asts",
        "name": "ASTS (Age-Appropriate Sprint Time Standard)",
        "category": "Time-Based",
        "type": "time_input",
        "description": "Sprint test - time recorded in seconds. Lower is better. Motor quotient calculated as (50th percentile time / student time) * 100",
        "ageGroups": {
            "6-8": {
                "label": "Years 2-3 (Age 6-9)",
                "girls": {
                    "50th_percentile": 29,
                    "normativeThresholds": {
                        "beginning": {"min": 0, "max": 65},
                        "progressing": {"min": 65, "max": 95},
                        "achieving": {"min": 95, "max": 120},
                        "excelling": {"min": 120, "max": 9999}
                    }
                },
                "boys": {
                    "50th_percentile": 26.6,
                    "normativeThresholds": {
                        "beginning": {"min": 0, "max": 59},
                        "progressing": {"min": 59, "max": 80},
                        "achieving": {"min": 80, "max": 110},
                        "excelling": {"min": 110, "max": 9999}
                    }
                }
            },
            "9-12": {
                "label": "Years 4-6 (Age 9-12)",
                "girls": {
                    "50th_percentile": 29.25,
                    "normativeThresholds": {
                        "beginning": {"min": 0, "max": 65},
                        "progressing": {"min": 65, "max": 95},
                        "achieving": {"min": 95, "max": 120},
                        "excelling": {"min": 120, "max": 9999}
                    }
                },
                "boys": {
                    "50th_percentile": 26.5,
                    "normativeThresholds": {
                        "beginning": {"min": 0, "max": 59},
                        "progressing": {"min": 59, "max": 80},
                        "achieving": {"min": 80, "max": 110},
                        "excelling": {"min": 110, "max": 9999}
                    }
                }
            }
        }
    }
}

# Routine (Gymnastics) - Rubric-based
ROUTINE_SKILL = {
    "routine": {
        "id": "routine",
        "name": "Routine (Gymnastics)",
        "category": "Rubric-Based",
        "type": "rubric",
        "rubricScale": [
            {
                "score": 1,
                "level": "Not Demonstrated",
                "description": "Student does not demonstrate the skill"
            },
            {
                "score": 2,
                "level": "Emerging",
                "description": "Student is beginning to demonstrate the skill with significant errors"
            },
            {
                "score": 3,
                "level": "Developing",
                "description": "Student demonstrates the skill with minor errors"
            },
            {
                "score": 4,
                "level": "Demonstrated",
                "description": "Student demonstrates the skill with proficiency"
            }
        ],
        "components": [
            {"name": "Sequencing", "ageExpectancy": "9y.o"},
            {"name": "Creativity", "ageExpectancy": "9y.o"},
            {"name": "Execution", "ageExpectancy": "9y.o"},
            {"name": "Variety of Elements", "ageExpectancy": "9y.o"}
        ],
        "scoringMethod": "Sum of 4 components (each 1-4 scale) = Total out of 16, then mapped to normative levels",
        "normativeThresholds": {
            "9": {"beginning": [0, 5], "progressing": [6, 9], "achieving": [10, 13], "excelling": [14, 16]},
            "10": {"beginning": [0, 5], "progressing": [6, 9], "achieving": [10, 13], "excelling": [14, 16]},
            "11": {"beginning": [0, 7], "progressing": [8, 11], "achieving": [12, 15], "excelling": [16, 16]},
        }
    }
}

# Rock to Stand - Binary
ROCK_TO_STAND_SKILL = {
    "rock_to_stand": {
        "id": "rock_to_stand",
        "name": "Rock to Stand",
        "category": "Binary",
        "type": "binary",
        "description": "Simple achieved/not achieved assessment - student demonstrates ability to rock body and use momentum to stand from lying down",
        "binary": {
            "1": "Achieved",
            "0": "Not Achieved"
        }
    }
}

def main():
    # Combine all skills
    all_skills = {
        **VIC_FMS_SKILLS,
        **ASTS_SKILL,
        **ROUTINE_SKILL,
        **ROCK_TO_STAND_SKILL
    }
    
    output = {
        "version": "1.0",
        "generated": "2026-01-01",
        "skillCount": len(all_skills),
        "skills": list(all_skills.values())
    }
    
    # Write to skills.json
    output_path = Path("C:/Users/robke/OneDrive/Desktop/Rob's FMS Scorecard/skills.json")
    output_path.write_text(json.dumps(output, indent=2))
    
    print("✓ Generated skills.json")
    print(f"✓ Total skills: {len(all_skills)}")
    print(f"✓ Saved to: {output_path}")
    print("\nSkills included:")
    for skill_id in sorted(all_skills.keys()):
        skill = all_skills[skill_id]
        print(f"  - {skill['name']} ({skill.get('category', 'Other')})")

if __name__ == "__main__":
    main()
