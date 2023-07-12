import { ParseEvent, createParser } from "eventsource-parser";
import { NextApiResponse } from "next";

const OpenAIStream = async (
  openAIResponse: Response,
  serverResponse: NextApiResponse
) => {
  const onParse = (event: ParseEvent) => {
    if (event.type === "event") {
      const data = event.data;

      if (data === "[DONE]") {
        return serverResponse.end();
      }

      const delta = JSON.parse(data).choices[0].delta;

      if (delta?.role) {
        return;
      }

      const text = delta.content ?? "";
      serverResponse.write(`data: ${JSON.stringify({ text })}\n\n`);
    }
  };

  const decoder = new TextDecoder();
  const parser = createParser(onParse);

  for await (const chunk of openAIResponse.body as any) {
    parser.feed(decoder.decode(chunk));
  }
};

export default OpenAIStream;
