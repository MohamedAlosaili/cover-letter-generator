interface input {
  id: string;
  name: string;
  inputType: "input" | "textarea";
  placeholder: string;
  label: string;
  hint: null | string;
  maxLength: number;
  required: boolean;
}

const inputs: input[] = [
  {
    id: "1",
    name: "candidateFullName",
    inputType: "input",
    placeholder: "Your full name e.g. Mohammed Ali",
    label: "Candidate Full Name",
    hint: null,
    maxLength: 50,
    required: true,
  },
  {
    id: "2",
    name: "jobTitle",
    inputType: "input",
    placeholder: "Position or Job title e.g. Frontend Developer",
    label: "Target Job Title",
    hint: null,
    maxLength: 50,
    required: true,
  },
  {
    id: "3",
    name: "companyName",
    inputType: "input",
    placeholder: "e.g. Google",
    label: "Company Name",
    hint: "The name of the company or organization you applying to. This allows you to personalize the cover letter.",
    maxLength: 50,
    required: true,
  },
  {
    id: "4",
    name: "releventSkills",
    inputType: "input",
    placeholder: "Briefly mention your key skills",
    label: "Relevant skills",
    hint: null,
    maxLength: 100,
    required: true,
  },
  {
    id: "5",
    name: "achievementsOrExperience",
    inputType: "textarea",
    placeholder: "Briefly mention some of your Experience or Achievements.",
    label: "Experience / Achievements",
    hint: "Mention any notable achievements or experiences relevant to the job, that would make you stand out as a candidate.",
    maxLength: 160,
    required: true,
  },
  {
    id: "6",
    name: "hiringManagerName",
    inputType: "input",
    placeholder: "Hiring Manager Name e.g. Khalid Ahmed",
    label: "Recipient Name",
    hint: "This can help to personalize the greeting. However, a generic greeting can be used if it's not known.",
    maxLength: 50,
    required: false,
  },
  {
    id: "7",
    name: "whyThisRole",
    inputType: "input",
    placeholder: "Why you're Interested in the Role/Company",
    label: "Why you are Interest",
    hint: "This shows enthusiasm and can help you stand out as a candidate.",
    maxLength: 75,
    required: false,
  },
  {
    id: "8",
    name: "additionalInfo",
    inputType: "textarea",
    placeholder: "Any additional information or instruction",
    label: "Addition information",
    hint: "Add anything you want that is not mentioned in the above fields",
    maxLength: 160,
    required: false,
  },
];

export default inputs;
