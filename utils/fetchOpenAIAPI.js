import ErrorResponse from "./ErrorResponse.js";

const fetchOpenAIAPI = async (userInfo, API_KEY) => {
  const OPENAI_API_KEY = API_KEY || process.env.OPENAI_KEY;

  if (!OPENAI_API_KEY) {
    throw new ErrorResponse("Missing OPENAI_API_KEY", 400);
  }

  if (
    !userInfo ||
    !userInfo.candidateFullName ||
    !userInfo.jobTitle ||
    !userInfo.companyName ||
    !userInfo.releventSkills
  ) {
    throw new ErrorResponse(
      "Missing userInfo object or one of the required fields",
      400
    );
  }

  const prompt = `You are an AI Cover Letter Email Generator. Your task is to generate a concise, professional, and engaging cover letter email that is customized to reflect the candidate's suitability for the role and company. Use the following details to create the cover letter:
  - Candidate's Full Name: ${userInfo.candidateFullName}.
  - Position Being Applied For: ${userInfo.jobTitle}.
  - Company Name: ${userInfo.companyName}
  - Key Skills Relevant to the Job: ${userInfo.releventSkills}.
  - Notable Achievements or Relevant Experience: ${
    userInfo.achievementsOrExperience
  }.
  - Recipient's Name (if knwon or general): ${
    userInfo.hiringManagerName ?? ""
  }${
    userInfo.whyThisRole
      ? `\n- Reasons for Interest in this Role or Company: ${userInfo.whyThisRole}.`
      : ""
  }${
    userInfo.additionalInfo
      ? `\n- Any Additional Information or Instructions: ${userInfo.additionalInfo}.`
      : ""
  }`;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: userInfo.temperature || 0.5,
    top_p: 1,
    n: 1,
    stream: true,
    max_tokens: 1000,
    presence_penalty: 0,
    frequency_penalty: 0,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response.status !== 200) {
    throw new ErrorResponse(response.statusText, response.status);
  }

  return response;
};

export default fetchOpenAIAPI;
