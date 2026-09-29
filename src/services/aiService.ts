import { MIRROR_AI_KNOWLEDGE } from '../data/cyberData';

export const N8N_CHATBOT_WEBHOOK_URL = 'https://mamathavalli.app.n8n.cloud/webhook/7426d229-bcd0-48da-9fab-6d04b0f23250/chat';

export interface AIResponse {
  reply: string;
  source: 'n8n' | 'gemini' | 'cybermirror-engine';
  suggestedActions?: { label: string; actionId: string }[];
  isWorkflowInactive?: boolean;
}

export interface N8nChatResponse {
  reply: string;
  source: 'n8n' | 'cybermirror-engine' | 'gemini';
  isWorkflowInactive?: boolean;
  hint?: string;
  raw?: any;
}

/**
 * Sends a message directly to the n8n Chatbot Workflow
 * Passes through /api/n8n-chat proxy to eliminate CORS constraints and guarantee reliability.
 */
export async function askN8nChatbot(userQuery: string, sessionId?: string): Promise<N8nChatResponse> {
  const query = userQuery.trim();
  const activeSessionId = sessionId || getOrCreateSessionId();

  // Guardrail 1: Refuse harmful exploitation or attack instructions
  const attackKeywords = [
    'how to hack', 'hack someone', 'ddos attack', 'sql injection script',
    'exploit payload', 'crack password', 'steal wifi', 'trojan source code',
    'keylogger download', 'hack instagram account', 'bypass pin illegally'
  ];
  if (attackKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
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
  if (credentialPatterns.some(pat => pat.test(query))) {
    return {
      reply: `⚠️ **Security Alert: Redacted Sensitive Data**\n\n${MIRROR_AI_KNOWLEDGE.secretRefusal}\n\nPlease erase any actual credentials from your message. In real-world incidents, never transmit passwords or one-time codes through chat or unverified support lines.`,
      source: 'cybermirror-engine'
    };
  }

  try {
    const res = await fetch('/api/n8n-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, sessionId: activeSessionId }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.reply) {
        return {
          reply: data.reply,
          source: 'n8n',
          raw: data.raw
        };
      } else if (data.status === 'n8n_inactive') {
        const localAnswer = await getLocalDefensiveReply(query);
        return {
          reply: `⚡ **n8n Workflow Notice:**\nYour n8n chatbot webhook is reachable, but the workflow is currently not in **Active** mode in your n8n cloud dashboard.\n\n👉 **To activate live n8n AI execution:**\n1. Open your n8n canvas at **mamathavalli.app.n8n.cloud**.\n2. Open your Chatbot workflow.\n3. Flip the toggle switch in the top-right corner to **Active**.\n\n---\n\n🛡️ **CyberMirror Defensive Engine Response in the Meantime:**\n\n${localAnswer.reply}`,
          source: 'cybermirror-engine',
          isWorkflowInactive: true,
          hint: data.hint
        };
      }
    }
  } catch (err) {
    console.debug('Failed to call n8n proxy, falling back to local engine:', err);
  }

  // Fallback to local defensive engine
  const local = await getLocalDefensiveReply(query);
  return {
    reply: local.reply,
    source: 'cybermirror-engine'
  };
}

/**
 * Intelligent Cyber Defensive Advisor Engine
 * Queries n8n first if preferred, or Gemini API, with fallback to local engine
 */
export async function askMirrorAI(userQuery: string, preferN8n = false): Promise<AIResponse> {
  const queryLower = userQuery.toLowerCase().trim();

  // Guardrails
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

  if (preferN8n) {
    const n8nResult = await askN8nChatbot(userQuery);
    return {
      reply: n8nResult.reply,
      source: n8nResult.source,
      isWorkflowInactive: n8nResult.isWorkflowInactive
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
    console.debug('Using local CyberMirror knowledge engine:', err);
  }

  return getLocalDefensiveReply(userQuery);
}

/**
 * Deterministic local defensive intelligence engine
 */
export async function getLocalDefensiveReply(userQuery: string): Promise<AIResponse> {
  const queryLower = userQuery.toLowerCase().trim();

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
    if (queryLower.includes('mfa') || queryLower.includes('2fa') || queryLower.includes('otp')) {
      return {
        reply: `🔐 **Two-Factor Authentication (2FA / MFA) ప్రాముఖ్యత:**\n\nMFA అనేది మీ డిజిటల్ అకౌంట్లకు రెండవ తాళం లాంటిది. ఎవరైనా మీ పాస్‌వర్డ్ దొంగిలించినప్పటికీ, మీ మొబైల్‌లోని కోడ్ లేకుండా వారు లాగిన్ కాలేరు.\n\n🛡️ **సిఫార్సు చేయబడిన రక్షణ:**\n- SMS బదులుగా **Google Authenticator** లేదా **Aegis** వంటి Authenticator Apps వాడండి.\n- పాస్‌కీలు (Passkeys) అందుబాటులో ఉంటే వాటిని యాక్టివేట్ చేయండి.`,
        source: 'cybermirror-engine'
      };
    }
    if (queryLower.includes('password') || queryLower.includes('passcode')) {
      return {
        reply: `🔑 **సురక్షితమైన పాస్‌వర్డ్ నియమాలు:**\n\n1. ఒకే పాస్‌వర్డ్ ని అన్ని వెబ్‌సైట్లలో వాడవద్దు (No Password Reuse).\n2. 16 కంటే ఎక్కువ అక్షరాలతో కూడిన పాస్‌ఫ్రేజ్ (Passphrase) వాడండి.\n3. **Bitwarden** లేదా **1Password** వంటి పాస్‌వర్డ్ మేనేజర్‌ను ఉపయోగించండి.`,
        source: 'cybermirror-engine'
      };
    }
    if (queryLower.includes('phone') && (queryLower.includes('poyindi') || queryLower.includes('lost'))) {
      return {
        reply: `📱 **ఫోన్ పోయినప్పుడు వెంటనే చేయవలసిన పనులు:**\n\n1. వెంటనే మీ టెలికాం ఆపరేటర్‌కు కాల్ చేసి **SIM కార్డ్‌ని బ్లాక్ చేయించండి** (దీనివల్ల దొంగలకు మీ బ్యాంక్ OTPలు రావు).\n2. గూగుల్ **Find My Device** లేదా యాపిల్ **Find My** ద్వారా ఫోన్‌ను రిమోట్ గా లాక్ లేదా డేటాను ఎరేజ్ (Erase) చేయండి.\n3. మీ బ్యాంకింగ్, UPI, మరియు Gmail పాస్‌వర్డ్‌లను వెంటనే మార్చండి.`,
        source: 'cybermirror-engine'
      };
    }
    return {
      reply: `🛡️ **సైబర్ భద్రతా సలహాదారు (CyberMirror):**\n\nమీరు అడిగిన ప్రశ్న: **"${userQuery}"**\n\nడిజిటల్ ప్రపంచంలో సురక్షితంగా ఉండటానికి ప్రాథమిక సూత్రాలు:\n- బలమైన మరియు వేర్వేరు పాస్‌వర్డ్‌లు వాడండి.\n- అనుమానాస్పద లింకులను క్లిక్ చేయకండి.\n- పబ్లిక్ Wi-Fi వాడేటప్పుడు వ్యక్తిగత వివరాలు లేదా బ్యాంకింగ్ ట్రాన్సాక్షన్స్ చేయకండి.\n\nఏదైనా నిర్దిష్ట అంశంపై సందేహం ఉంటే తప్పకుండా అడగండి!`,
      source: 'cybermirror-engine'
    };
  }

  // Phishing analysis query
  if (queryLower.includes('phish') || queryLower.includes('fake email') || queryLower.includes('suspicious message') || queryLower.includes('scam')) {
    return {
      reply: `🔍 **Phishing & Social Engineering Detection Guide**\n\nThreat actors exploit urgency, fear, and curiosity to bypass critical thinking. When evaluating any suspicious notification:\n\n1. **Inspect the Full Sender Domain:** Check the true address, not the display name (e.g. \`service@pay-paI.com\` vs \`paypal.com\`).\n2. **Deceptive Urgency:** Legitimate institutions almost never demand action within "1-2 hours" under penalty of total deletion.\n3. **Unsolicited Attachment Danger:** Never open unexpected \`.html\`, \`.zip\`, \`.exe\`, or macro-enabled documents.\n4. **Independent Channel Verification:** Close the email, open a new browser window, and navigate directly to the vendor's official bookmarked address.`,
      source: 'cybermirror-engine'
    };
  }

  // Ransomware queries
  if (queryLower.includes('ransomware') || queryLower.includes('encrypted') || queryLower.includes('crypto locker')) {
    return {
      reply: `⚠️ **Ransomware Threat Model & Containment**\n\nRansomware silently deletes shadow copies, encrypts documents with AES-256/RSA, and demands extortion payments.\n\n**Immediate Incident Response Protocol:**\n1. **Isolate Instantly:** Pull Ethernet cables and disable Wi-Fi to stop the malware from encrypting network shares.\n2. **Do Not Pay:** Paying does not guarantee file recovery and marks you as an easy target for follow-up extortion.\n3. **Deploy the 3-2-1 Backup Strategy:** 3 copies of your files, 2 different storage types, 1 isolated offline (air-gapped) copy.\n4. **Report the Incident:** Submit the extortion note to CISA (US) or local cybercrime enforcement.`,
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

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'session-default';
  let sid = localStorage.getItem('cybermirror_chat_session_id');
  if (!sid) {
    sid = 'cm-session-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
    localStorage.setItem('cybermirror_chat_session_id', sid);
  }
  return sid;
}
