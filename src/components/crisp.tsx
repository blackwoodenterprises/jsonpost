"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    // Replace "YOUR_CRISP_WEBSITE_ID" with your actual Crisp Website ID
    Crisp.configure("f0c384e6-deb8-47b2-a120-dfe3d22146c6");
  }, []);

  return null;
};

export default CrispChat;
