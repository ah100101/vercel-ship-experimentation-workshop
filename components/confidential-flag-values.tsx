import { encrypt, FlagValuesType } from "@vercel/flags";
import { FlagValues } from "@vercel/flags/react";

export default async function ConfidentialFlagValues({
  values,
}: {
  values: FlagValuesType;
}) {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
}
