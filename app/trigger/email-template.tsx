import type { FC } from "react";

interface EmailTemplateProps {
  url: string;
  condition: string;
}

export const PyngEmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  url,
  condition,
}) => (
  <div>
    <h1>Hey!</h1>
    <p>Your pyng has been triggered!</p>
    <p>Url: {url}</p>
    <p>Condition: {condition}</p>
    <p>Thanks for using Pyngme.</p>
  </div>
);
