import { UserInfo } from "@/inputs";
import { OpenAIStreamPayload } from "./types";

const fetchAPI = async (userInfo: UserInfo, API_KEY: string | undefined) => {
  const OPENAI_API_KEY = API_KEY ?? process.env.OPENAI_KEY;

  if (!OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 400 });
  }

  if (
    !userInfo ||
    !userInfo.candidateFullName ||
    !userInfo.jobTitle ||
    !userInfo.companyName ||
    !userInfo.releventSkills
  ) {
    return new Response(
      "Missing userInfo object or one of the required fields",
      { status: 400 }
    );
  }

  const prompt = `Generate a concise yet effective cover letter email based on the information provided:
  - Candidate's Full Name: ${userInfo.candidateFullName}
  - Position Being Applied For: ${userInfo.jobTitle}
  - Company Name: ${userInfo.companyName}
  - Key Skills Relevant to the Job: ${userInfo.releventSkills}
  - Notable Achievements or Relevant Experience: ${
    userInfo.achievementsOrExperience
  }${
    userInfo.hiringManagerName
      ? `\n- Recipient's Name: ${userInfo.hiringManagerName}`
      : ""
  }${
    userInfo.whyThisRole
      ? `\n- Reasons for Interest in this Role or Company: ${userInfo.whyThisRole}`
      : ""
  }${
    userInfo.additionalInfo
      ? `\n- Any Additional Information or Instructions: ${userInfo.additionalInfo}`
      : ""
  }`;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: userInfo.temperature ?? 0.5,
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

  return response;
};

export default fetchAPI;
