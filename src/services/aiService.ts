import { MIRROR_AI_KNOWLEDGE } from '../data/cyberData';

export interface AIResponse {
  reply: string;
  source: 'gemini' | 'cybermirror-engine';
  suggestedActions?: { label: string; actionId: string }[];
}

/**
 * Intelligent Cyber Defensive Advisor Engine
 * Fallback knowledge processor + Telugu/Telenglish & safety guardrails
 */
export async function askMirrorAI(userQuery: string): Promise<AIResponse> {
  const queryLower = userQuery.toLowerCase().trim();

  // Guardrail 1: Refuse harmful exploitation or attack instructions
  const attackKeywords = [
    'how to hack', 'hack someone', 'ddos attack', 'sql injection script',
    'exploit payload', 'crack password', 'steal wifi', 'trojan source code',
    'keylogger download', 'hack instagram account', 'bypass pin illegally'
  ];
  if (attackKeywords.some(keyword => queryLower.includes(keyword))) {
    return {
      reply: `🛡️ **Defensive Policy Notice**\n\n${MIRROR_AI_KNOWLEDGE.guardrailRefusal}\n\n**Educational Context:** In professional cybersecurity, understanding how vulnerabilities function is used strictly for defensive remediation, penetration testing with written authorization, and patch management. If you want to learn how to **protect** systems against these attack types, feel free to ask!`,
      source: 'cybermirror-engine'
    };
  }

  // Guardrail 2: Refuse confidential / sensitive personal credentials
  const credentialPatterns = [
    /password\s*[:=]\s*\S+/i,
    /otp\s*[:=]\s*\d{4,6}/i,
    /cvv\s*[:=]\s*\d{3,4}/i
  ];
  if (credentialPatterns.some(pat => pat.test(userQuery))) {
    return {
      reply: `⚠️ **Security Alert: Redacted Sensitive Data**\n\n${MIRROR_AI_KNOWLEDGE.secretRefusal}\n\nPlease erase any actual credentials from your message. In real-world incidents, never transmit passwords or one-time codes through chat or unverified support lines.`,
      source: 'cybermirror-engine'
    };
  }

  // Try Server-Side Gemini API first
  try {
    const res = await fetch('/api/mirror-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userQuery }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.reply) {
        return {
          reply: data.reply,
          source: 'gemini'
        };
      }
    }
  } catch (err) {
    // Graceful fallback to local engine
    console.debug('Using local CyberMirror knowledge engine:', err);
  }

  // Local Intelligence Engine (Deterministic high-grade defensive replies)
  
  // Telugu & Telenglish Queries
  if (
    queryLower.includes('ante enti') || 
    queryLower.includes('ela') || 
    queryLower.includes('cheyali') || 
    queryLower.includes('enduku') || 
    queryLower.includes('telugu') ||
    queryLower.includes('bhadhratha') ||
    queryLower.includes('nenu')
  ) {
    if (queryLower.includes('phishing') || queryLower.includes('link')) {
      return {
        reply: `🔍 **ఫిషింగ్ (Phishing) అంటే ఏమిటి?**\n\nఫిషింగ్ అనేది సైబర్ నేరగాళ్ళు ఉపయోగించే ఒక మోసపూరిత పద్ధతి. వారు మీ బ్యాంక్, నెట్‌ఫ్లిక్స్, లేదా గూగుల్ వంటి ప్రసిద్ధ కంపెనీల పేర్లతో నకిలీ లింకులు లేదా సందేశాలు (SMS/Email) పంపుతారు.\n\n⚠️ **ముఖ్యమైన రక్షణ చిట్కాలు:**\n1. తెలియని వ్యక్తులు పంపిన లింకులపై క్లిక్ చేయకండి.\n2. వెబ్‌సైట్ అడ్రస్ (URL) స్పెల్లింగ్ సరిగ్గా ఉందో లేదో చూడండి.\n3. ఎవరితోనూ మీ OTP లేదా పాస్‌వర్డ్ పంచుకోకండి.\n4. ఎల్లప్పుడూ Two-Factor Authentication (2FA) ఆన్ చేసుకోండి.`,
        source: 'cybermirror-engine'
      };
    }

    if (queryLower.includes('mfa') || queryLower.includes('2fa')) {
      return {
        reply: `🔐 **MFA (టూ-ఫ్యాక్టర్ అథెంటికేషన్) ఎందుకు ముఖ్యం?**\n\nMFA అనేది మీ అకౌంట్‌కు రెండవ తాళం లాంటిది. ఒకవేళ ఎవరైనా మీ పాస్‌వర్డ్ తెలుసుకున్నా కూడా, మీ ఫోన్‌లోని Authenticator కోడ్ లేదా OTP లేకుండా మీ అకౌంట్ ఓపెన్ చేయలేరు.\n\n🛡️ **సిఫార్సు:**\n- Google Authenticator లేదా Aegis వంటి యాప్‌లను ఉపయోగించడం SMS కంటే చాలా సురక్షితం.`,
        source: 'cybermirror-engine'
      };
    }

    if (queryLower.includes('instagram') || queryLower.includes('account')) {
      return {
        reply: `🛡️ **మీ ఇన్‌స్టాగ్రామ్ / సోషల్ మీడియా అకౌంట్‌ను ఎలా కాపాడుకోవాలి?**\n\n1. **Two-Factor Authentication (2FA)** ఆన్ చేయండి: Settings > Security > Two-Factor Authentication.\n2. **స్ట్రాంగ్ పాస్‌వర్డ్**: కనీసం 12-16 అక్షరాల ప్రత్యేకమైన పాస్‌వర్డ్ వాడండి.\n3. **స్పామ్ మెసేజ్లు నమ్మకండి**: "మీ ఫోటో కాపీరైట్ ఉల్లంఘించింది" లేదా "మీరు లాటరీ గెలిచారు" అనే DM లింకులు క్లిక్ చేయకండి.\n4. **లాగిన్ యాక్టివిటీ**: మీ ఖాతా ఎక్కడెక్కడ లాగిన్ అయి ఉందో చూసి తెలియని డివైజ్‌లను లాగౌట్ చేయండి.`,
        source: 'cybermirror-engine'
      };
    }

    return {
      reply: `🛡️ **సైబర్ భద్రతా సలహా (Cyber Security Guidance):**\n\nమీ ఆన్‌లైన్ అకౌంట్స్ మరియు డిజిటల్ డేటా సురక్షితంగా ఉండటానికి:\n- ప్రతి వెబ్‌సైట్‌కు వేర్వేరు పాస్‌వర్డ్స్ వాడండి (Password Manager).\n- 2-Factor Authentication (2FA) తప్పనిసరిగా ఆన్ చేయండి.\n- పబ్లిక్ వైఫై (Public Wi-Fi) వాడేటప్పుడు బ్యాంకింగ్ లావాదేవీలు చేయకండి.\n- అనుమానాస్పద లింకులు క్లిక్ చేయకండి.\n\nమీకు ఇంకా ఏ విషయంలో సహాయం కావాలి? (ఉదాహరణకు: Ransomware, Phishing, Passwords)`,
      source: 'cybermirror-engine'
    };
  }

  // Phishing Evaluation Queries
  if (queryLower.includes('is this phishing') || queryLower.includes('phishing check') || queryLower.includes('suspicious email') || queryLower.includes('fake link')) {
    return {
      reply: `🔍 **Phishing & Deceptive Message Evaluation Framework**\n\nTo determine if an email, SMS, or link is phishing, evaluate these 5 core red flags:\n\n1. **Artificial Urgency & Fear:** Does it demand action within 2-24 hours ("Account will be suspended", "Unauthorized charge of $499.00 pending")? Threat actors use anxiety to short-circuit logical analysis.\n2. **Domain Mismatch:** Check the exact sender domain. For example, \`service@apple-billing-resolve-security.com\` is **NOT** \`apple.com\`. Look closely for typosquatting (e.g. \`rn\` instead of \`m\`).\n3. **Generic Salutation:** Real services address you by your account name, not "Dear Customer" or "Valued Client".\n4. **Credential Request:** Legitimate institutions will NEVER send an email link requiring you to re-enter your password or OTP.\n5. **Attachment Danger:** Never open unsolicited \`.zip\`, \`.html\`, \`.iso\`, or double-extension files (\`.pdf.exe\`).\n\n💡 **Defensive Protocol:** If in doubt, do not click the link. Open a clean browser tab and log into the service directly via their official bookmark or application.`,
      source: 'cybermirror-engine'
    };
  }

  // Ransomware Queries
  if (queryLower.includes('ransomware') || queryLower.includes('crypto locker') || queryLower.includes('encrypted files')) {
    return {
      reply: `🔒 **Understanding Ransomware & Incident Response**\n\n**What is Ransomware?**\nRansomware is malicious software that encrypts your files (documents, family photos, business spreadsheets) using asymmetric encryption (AES/RSA) and displays a ransom note demanding cryptocurrency payment for the decryption key.\n\n**How Does It Spread?**\n- Phishing attachments disguised as invoices or receipts\n- Sideloaded pirated software, cracked games, or fake installers\n- Unpatched vulnerabilities in remote desktop services (RDP)\n\n**Immediate Containment Steps:**\n1. **Isolate Instantly:** Unplug ethernet cables and turn off Wi-Fi to stop the malware from propagating to network drives.\n2. **Do Not Pay:** The FBI and Europol advise against paying — over 40% of victims never recover their data, and it funds future attacks.\n3. **Restore from Immutable Backups:** Use offline or cloud versioned backups created prior to the infection.\n4. **Check NoMoreRansom.org:** Europol and security vendors maintain free decryption tools for hundreds of known strains.`,
      source: 'cybermirror-engine'
    };
  }

  // Instagram / Social Media Queries
  if (queryLower.includes('instagram') || queryLower.includes('social media') || queryLower.includes('facebook') || queryLower.includes('tiktok')) {
    return {
      reply: `📱 **Securing Your Social Media Accounts (Hardening Checklist)**\n\nSocial accounts are prime targets for impersonation, extortion, and spreading phishing lures to friends. Here is how to lock down your profile:\n\n1. **Enable App-Based 2FA:**\n   - Open Settings > Accounts Center > Password and Security > Two-Factor Authentication.\n   - Select **Authentication App** (Google Authenticator / Aegis) rather than SMS.\n   - Download and save your backup recovery codes.\n2. **Audit Active Logged-In Sessions:**\n   - Check "Where You're Logged In" and terminate any unfamiliar sessions or obsolete phones.\n3. **De-link Unused Third-Party Apps:**\n   - Revoke access to old quiz apps, analytics trackers, or follower trackers under "Apps and Websites".\n4. **Beware of Direct Message (DM) Lures:**\n   - Common scam: "Help me get my ambassador badge, I sent a code to your phone" — that code is actually an Instagram password reset for YOUR account!`,
      source: 'cybermirror-engine'
    };
  }

  // MFA / 2FA Importance Queries
  if (queryLower.includes('mfa') || queryLower.includes('2fa') || queryLower.includes('two factor') || queryLower.includes('passkey')) {
    return {
      reply: `🛡️ **Why Multi-Factor Authentication (MFA) is Crucial**\n\nEven if you choose a 20-character password, it can still be stolen via:\n- Third-party data breaches at other websites\n- Infostealer malware on your computer\n- Phishing portals\n\n**How MFA Neutralizes Credential Theft:**\n- **Without MFA:** Stolen password = Immediate account takeover.\n- **With MFA:** Stolen password = Attacker blocked at the secondary challenge barrier.\n\nAccording to Microsoft Threat Intelligence, enforcing MFA prevents over **99.2% of automated account compromise attempts** across global corporate identities.\n\n**Best to Worst MFA Methods:**\n1. 🥇 **Hardware Security Keys (FIDO2 / YubiKey & Passkeys)** — Cryptographically unphishable\n2. 🥈 **Authenticator App (TOTP)** — Time-based 30s rotating codes\n3. 🥉 **SMS Codes** — Vulnerable to SIM-swapping, but still better than no 2FA at all`,
      source: 'cybermirror-engine'
    };
  }

  // Wi-Fi and VPN Queries
  if (queryLower.includes('wifi') || queryLower.includes('wi-fi') || queryLower.includes('vpn') || queryLower.includes('public network')) {
    return {
      reply: `📶 **Public Wi-Fi Security & Defense**\n\nOpen Wi-Fi at airports and cafes has no client isolation, exposing you to:\n- **Evil Twin Rogue Hotspots:** Attackers broadcast the same Wi-Fi name to intercept traffic.\n- **DNS Snooping:** Observing which websites and domains you visit.\n- **LAN Probing:** Exploiting open file shares and unpatched system services.\n\n**Recommended Countermeasures:**\n1. Prefer your mobile phone's **Personal Hotspot** for banking or sensitive work.\n2. If using public Wi-Fi, connect through a trusted **encrypted VPN** (WireGuard / OpenVPN) before opening applications.\n3. Disable "Auto-Join Open Networks" on your phone and laptop.\n4. Never enter Google or Apple credentials into "Free Wi-Fi" splash screens.`,
      source: 'cybermirror-engine'
    };
  }

  // Password Security Queries
  if (queryLower.includes('password') || queryLower.includes('bitwarden') || queryLower.includes('manager')) {
    return {
      reply: `🔑 **Modern Password Security Principles**\n\nForget the myth of changing passwords every 30 days or replacing 'E' with '3'. Modern attacks use dictionary permutation engines that crack predictable patterns instantly.\n\n**The Gold Standards:**\n1. **Length Beats Complexity:** A 4-word random passphrase (e.g. \`solar-blanket-breeze-cabin\`) is harder to crack than \`Tr0ub4dor&3\`.\n2. **Zero Reuse:** Every single website must have an entirely distinct password.\n3. **Use an Audited Password Manager:** Let tools like Bitwarden, 1Password, or Proton Pass remember 200 random passwords for you.\n4. **Passkeys Are the Future:** Where available, switch to Passkeys (WebAuthn) for passwordless biometric logins.`,
      source: 'cybermirror-engine'
    };
  }

  // General Defensive Guidance Default
  return {
    reply: `🛡️ **CyberMirror Security Insight**\n\nYou asked about: **"${userQuery}"**\n\n**Key Defensive Principles:**\n- **Zero Trust:** Always verify identity before taking action on unsolicited communications.\n- **Defense in Depth:** Layer your security so that if one control fails (e.g. password leaked), secondary controls (MFA, network isolation) protect your assets.\n- **Attack Surface Minimization:** Delete unused accounts, turn off public social indexing, and minimize data shared online.\n\nFeel free to ask for specific guidance on **phishing analysis**, **ransomware containment**, **password managers**, or test a scenario in the **Attack Simulator**!`,
    source: 'cybermirror-engine'
  };
}
