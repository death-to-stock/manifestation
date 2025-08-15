// lib/saasco.ts
import { Saasco } from "saasco-sdk";

export const saasco = new Saasco({
  // This is the project Id for DTS Manifestation 👇
  projectId: "cmec7kcq40000iidmfkq16zbn",

  // Enable debug in dev to see console logs
  debug: true,

  // Set enabled to false on dev environments
  // enabled: false,
});
