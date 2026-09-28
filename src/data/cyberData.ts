import { 
  SecurityQuestion, 
  HardeningCountermeasure, 
  AttackScenario, 
  ExposureNode, 
  LearningModule, 
  QuizQuestion 
} from '../types/cyber';

/**
 * 10 Realistic Security Check Questions
 * Purely educational - Never asks for actual credentials or private information.
 */
export const SECURITY_QUESTIONS: SecurityQuestion[] = [
  {
    id: 'q-password-reuse',
    category: 'password',
    categoryLabel: 'Password Security',
    title: 'Do you reuse passwords across multiple websites or accounts?',
    scenarioContext: 'Threat actors aggregate billions of credentials leaked in past breaches to run automated "Credential Stuffing" attacks on your other accounts.',
    whyItMatters: 'If one low-priority forum you joined 5 years ago gets breached, your primary email, banking, or cloud storage becomes immediately vulnerable if they share the same password.',
    options: [
      {
        id: 'pw-reuse-often',
        label: 'Yes, I use 1 or 2 passwords for almost everything',
        subtext: 'High convenience, severe security exposure',
        riskScore: 10,
        riskFactor: 'Severe credential stuffing vulnerability across all active logins',
        countermeasureTitle: 'Adopt a Password Manager with Unique Passwords',
        countermeasureAction: 'Generate and store 16+ character unique passwords for every service using Bitwarden, 1Password, or Proton Pass.',
        countermeasureCategory: 'password'
      },
      {
        id: 'pw-reuse-some',
        label: 'I use variations of a base password with minor tweaks (e.g., Year or Exclamation)',
        subtext: 'Rule-based dictionary tools crack variations in seconds',
        riskScore: 6,
        riskFactor: 'Predictable permutation vulnerability against dictionary attacks',
        countermeasureTitle: 'Eliminate Password Variations',
        countermeasureAction: 'Automated hash-cracking tools (like Hashcat) mutate base words effortlessly. Replace variations with random passphrases.',
        countermeasureCategory: 'password'
      },
      {
        id: 'pw-reuse-never',
        label: 'No, every account has a unique, randomly generated password stored in a password manager',
        subtext: 'Industry standard best practice',
        riskScore: 0,
        riskFactor: 'Isolated breach blast-radius; credential stuffing negated',
        countermeasureTitle: 'Password Best Practices Active',
        countermeasureAction: 'Maintain routine audits of your password vault for leaked or weak entries.',
        countermeasureCategory: 'password'
      }
    ]
  },
  {
    id: 'q-mfa-status',
    category: 'account',
    categoryLabel: 'Account Security',
    title: 'Is Two-Factor Authentication (2FA / MFA) enabled on your primary accounts?',
    scenarioContext: 'Primary accounts include your email inbox, banking apps, password manager, and primary cloud IDs (Apple/Google).',
    whyItMatters: 'According to CISA and Microsoft, MFA blocks over 99.2% of automated account compromise attempts, even when passwords are leaked.',
    options: [
      {
        id: 'mfa-none',
        label: 'No, I only use passwords for logging in',
        subtext: 'Zero secondary barrier if password is breached or phished',
        riskScore: 10,
        riskFactor: 'Single point of failure; single compromised password grants total control',
        countermeasureTitle: 'Enable Authenticator App / Passkeys',
        countermeasureAction: 'Activate 2FA using Google Authenticator, Aegis, 2FAS, or Passkeys on your primary email and banking portals.',
        countermeasureCategory: 'account'
      },
      {
        id: 'mfa-sms-only',
        label: 'Yes, but only via SMS text messages',
        subtext: 'Better than nothing, but susceptible to SIM-swapping and SS7 interception',
        riskScore: 4,
        riskFactor: 'Vulnerable to carrier social engineering and SIM-swapping bypasses',
        countermeasureTitle: 'Upgrade SMS MFA to App-Based TOTP or Hardware Keys',
        countermeasureAction: 'Transition from SMS codes to time-based one-time password (TOTP) apps or FIDO2 WebAuthn keys (YubiKey).',
        countermeasureCategory: 'account'
      },
      {
        id: 'mfa-totp-keys',
        label: 'Yes, using an Authenticator app, Passkeys, or Hardware Security Key',
        subtext: 'High-assurance authentication resistant to credential theft',
        riskScore: 0,
        riskFactor: 'Cryptographically bounded secondary defense active',
        countermeasureTitle: 'MFA Hardened',
        countermeasureAction: 'Ensure you have securely printed or stored emergency recovery codes in a fireproof or safe location.',
        countermeasureCategory: 'account'
      }
    ]
  },
  {
    id: 'q-public-wifi',
    category: 'device',
    categoryLabel: 'Network Security',
    title: 'How do you handle public or open Wi-Fi networks (cafes, airports, hotels)?',
    scenarioContext: 'Public Wi-Fi networks frequently lack client isolation, allowing malicious actors on the same LAN to perform ARP spoofing or run rogue captive portals.',
    whyItMatters: 'Unsecured Wi-Fi allows "Evil Twin" hotspots to intercept unencrypted DNS requests, inject rogue redirects, or probe open ports on your device.',
    options: [
      {
        id: 'wifi-careless',
        label: 'I connect automatically to any free open Wi-Fi and browse without VPN',
        subtext: 'Exposes local device services, DNS traffic, and unencrypted queries',
        riskScore: 8,
        riskFactor: 'Susceptible to Evil Twin rogue APs, local packet sniffing, and captive portal clones',
        countermeasureTitle: 'Enforce Trusted VPN & Disable Auto-Join',
        countermeasureAction: 'Turn off "Auto-Join Open Networks" on phone/laptop; route traffic through a trusted encrypted WireGuard/OpenVPN tunnel.',
        countermeasureCategory: 'device'
      },
      {
        id: 'wifi-cautious',
        label: 'I use open Wi-Fi occasionally, but make sure sites show HTTPS lock icons',
        subtext: 'HTTPS encrypts content, but metadata, SNI, and DNS queries remain visible',
        riskScore: 4,
        riskFactor: 'DNS snooping and local LAN device enumeration still feasible',
        countermeasureTitle: 'Enable DNS-over-HTTPS (DoH) & Cellular Tethering',
        countermeasureAction: 'Prefer your mobile phone personal hotspot over public coffee-shop Wi-Fi when handling sensitive financial tasks.',
        countermeasureCategory: 'device'
      },
      {
        id: 'wifi-safe',
        label: 'I strictly use cellular hotspot or an encrypted VPN on all untrusted networks',
        subtext: 'All outgoing traffic is securely tunneled and device discovery is blocked',
        riskScore: 0,
        riskFactor: 'Encrypted tunnel isolates device from local LAN adversaries',
        countermeasureTitle: 'Network Hygiene Maintained',
        countermeasureAction: 'Periodically verify your VPN kill-switch is active to avoid leaks during unexpected disconnects.',
        countermeasureCategory: 'device'
      }
    ]
  },
  {
    id: 'q-email-visibility',
    category: 'privacy',
    categoryLabel: 'Privacy Exposure',
    title: 'Is your primary personal email address publicly indexed or shared on public forums?',
    scenarioContext: 'Scrapers and automated OSINT tools constantly harvest email addresses from GitHub commits, social profiles, public directories, and comments.',
    whyItMatters: 'Publicly exposed emails become immediate targets for automated spam campaigns, spear-phishing lures, and credential-stuffing databases.',
    options: [
      {
        id: 'email-public',
        label: 'Yes, my main email is published in public bios, forums, or websites',
        subtext: 'Easily harvested by automated OSINT crawlers and botnets',
        riskScore: 8,
        riskFactor: 'High target profile for automated spear-phishing and spam lists',
        countermeasureTitle: 'Deploy Email Aliasing Services',
        countermeasureAction: 'Use email aliases (SimpleLogin, AnonAddy, or Apple Hide My Email) so your true master inbox is never publicly indexed.',
        countermeasureCategory: 'privacy'
      },
      {
        id: 'email-moderate',
        label: 'It is not directly public, but I use the same email for both newsletter signups and banking',
        subtext: 'If a newsletter database leaks, your financial identifier is exposed',
        riskScore: 5,
        riskFactor: 'Domain cross-contamination; low-security service breaches reveal banking IDs',
        countermeasureTitle: 'Segment Email Addresses by Risk Tier',
        countermeasureAction: 'Reserve one secret email exclusively for financial/recovery accounts, and a secondary public email for general services.',
        countermeasureCategory: 'privacy'
      },
      {
        id: 'email-segmented',
        label: 'No, I use disposable aliases for registrations and keep my recovery email strictly private',
        subtext: 'Minimizes digital footprint and isolates account discovery',
        riskScore: 0,
        riskFactor: 'Minimal OSINT attack surface; attackers cannot easily pivot',
        countermeasureTitle: 'Identity Segmentation Intact',
        countermeasureAction: 'Review forwarded alias rules quarterly to discard junk or noisy senders.',
        countermeasureCategory: 'privacy'
      }
    ]
  },
  {
    id: 'q-social-osint',
    category: 'social',
    categoryLabel: 'Social Engineering Risk',
    title: 'Do your public social media profiles reveal personal details (birthdate, hometown, family members, pet names, live check-ins)?',
    scenarioContext: 'Adversaries craft customized spear-phishing narratives and guess password recovery questions using publicly accessible social breadcrumbs.',
    whyItMatters: 'Security questions like "What was the name of your first elementary school?" or "Mother\'s maiden name" are trivial to solve via Facebook or LinkedIn profiles.',
    options: [
      {
        id: 'social-overshare',
        label: 'Yes, my profiles are public with personal updates, family tags, and location tags',
        subtext: 'Provides full psychological dossier for spear-phishing and pretexting',
        riskScore: 9,
        riskFactor: 'Exposes answers to security verification questions and facilitates targeted spear-phishing',
        countermeasureTitle: 'Sanitize Social Privacy & Treat Security Questions as Passwords',
        countermeasureAction: 'Switch social profiles to Private, delete public birth years, and fill security questions with random generated passphrases rather than real facts.',
        countermeasureCategory: 'social'
      },
      {
        id: 'social-moderate',
        label: 'My profiles are mostly set to Friends, but I have hundreds of contacts and some public posts',
        subtext: 'Large friend networks often include cloned or compromised accounts',
        riskScore: 4,
        riskFactor: 'Potential reconnaissance via friend-list scraping or compromised mutual connections',
        countermeasureTitle: 'Conduct a Privacy Audit on Social Networks',
        countermeasureAction: 'Prune unknown followers, hide friend lists from public visibility, and disable search engine indexing on social networks.',
        countermeasureCategory: 'social'
      },
      {
        id: 'social-strict',
        label: 'No, I share minimal personal info, keep strict privacy controls, and never post real-time locations',
        subtext: 'Significantly raises cost for an attacker attempting social engineering',
        riskScore: 0,
        riskFactor: 'Low OSINT yield for threat actors',
        countermeasureTitle: 'Privacy Hygiene Verified',
        countermeasureAction: 'Stay mindful of family members tagging your likeness or location in their public posts.',
        countermeasureCategory: 'social'
      }
    ]
  },
  {
    id: 'q-app-sideloading',
    category: 'device',
    categoryLabel: 'Device Security',
    title: 'Do you download or install applications from outside official app stores (APKs, cracked games, torrents)?',
    scenarioContext: 'Pirated software, modded games, and unverified APKs are the primary vector for infostealer malware (like RedLine, Lumma, and Vidar).',
    whyItMatters: 'Infostealers run in the background, exfiltrate browser-saved passwords, steal active session cookies, and copy crypto wallets in under 30 seconds.',
    options: [
      {
        id: 'apps-pirated',
        label: 'Yes, I occasionally install cracked software, pirated tools, or third-party APKs',
        subtext: 'Extremely high risk of trojanized malware with embedded backdoors',
        riskScore: 10,
        riskFactor: 'High probability of active background infostealer or root-level backdoor',
        countermeasureTitle: 'Halt Sideloading & Run Comprehensive Antimalware Audit',
        countermeasureAction: 'Only install software signed by verified developers from official repositories. Scan existing machines with Microsoft Defender / Malwarebytes.',
        countermeasureCategory: 'device'
      },
      {
        id: 'apps-sometimes',
        label: 'Rarely, but I trust links from Discord servers, forums, or Telegram channels',
        subtext: 'Threat actors frequently compromise reputable community servers to drop malicious payloads',
        riskScore: 6,
        riskFactor: 'Susceptible to watering hole attacks and disguised malicious links in trusted chats',
        countermeasureTitle: 'Enforce Sandboxing & Verify Hashes',
        countermeasureAction: 'If software must be tested, run it inside an isolated VM (Windows Sandbox) and upload executables to VirusTotal before execution.',
        countermeasureCategory: 'device'
      },
      {
        id: 'apps-official-only',
        label: 'No, I exclusively install verified software from official app stores and official vendor websites',
        subtext: 'Leverages store review pipelines, code signing, and sandboxed runtimes',
        riskScore: 0,
        riskFactor: 'App store sandboxing and code-signature verification prevent unauthorized binary execution',
        countermeasureTitle: 'Execution Guardrails Active',
        countermeasureAction: 'Ensure OS gatekeeper / SmartScreen remains enabled to reject unsigned installers.',
        countermeasureCategory: 'device'
      }
    ]
  },
  {
    id: 'q-device-updates',
    category: 'device',
    categoryLabel: 'Device Security',
    title: 'How promptly do you install system updates (OS, browsers, mobile firmware)?',
    scenarioContext: 'Over 80% of successful exploits leverage known vulnerabilities (CVEs) where an official security patch was already published weeks or months prior.',
    whyItMatters: 'Zero-day and N-day exploits target unpatched browsers and operating systems to execute arbitrary code simply by visiting an infected webpage.',
    options: [
      {
        id: 'update-delay-long',
        label: 'I postpone updates for months or ignore them because restarting is inconvenient',
        subtext: 'Leaves publicly documented exploit paths wide open on your device',
        riskScore: 9,
        riskFactor: 'Exposed to automated exploit kits targeting known unpatched CVEs',
        countermeasureTitle: 'Turn On Automatic System & Browser Updates',
        countermeasureAction: 'Enable "Automatically download and install updates" in Windows/macOS/iOS/Android settings. Keep Chrome/Firefox updated.',
        countermeasureCategory: 'device'
      },
      {
        id: 'update-delay-some',
        label: 'I update every few weeks when prompted repeatedly',
        subtext: 'Creates a window of exposure after security advisories are publicized',
        riskScore: 4,
        riskFactor: 'Exposure window during weaponized N-day vulnerability dissemination',
        countermeasureTitle: 'Shorten Patch Cycle to Under 48 Hours',
        countermeasureAction: 'Set updates to install during overnight charging cycles so daily workflow is never interrupted.',
        countermeasureCategory: 'device'
      },
      {
        id: 'update-immediate',
        label: 'Automatic updates are turned on across all my devices and browsers',
        subtext: 'Patches zero-day and critical CVEs within hours of public release',
        riskScore: 0,
        riskFactor: 'Continuous vulnerability remediation minimizes attack window',
        countermeasureTitle: 'Patch Management Active',
        countermeasureAction: 'Keep home router and IoT camera firmware updated alongside phones and PCs.',
        countermeasureCategory: 'device'
      }
    ]
  },
  {
    id: 'q-unknown-links',
    category: 'social',
    categoryLabel: 'Social Engineering Risk',
    title: 'When you receive an urgent message, email, or SMS with a link (e.g. delivery failure, account suspension, tax refund), what is your response?',
    scenarioContext: 'Phishing and smishing messages deliberately manufacture false panic, urgency, or fear to bypass logical scrutiny.',
    whyItMatters: 'Attackers create high-fidelity duplicate login pages designed to capture credentials and session tokens before you notice the mismatched URL.',
    options: [
      {
        id: 'links-click-fast',
        label: 'I often click the link to check what happened, especially if it looks legitimate',
        subtext: 'Directly enters attacker phishing funnel',
        riskScore: 9,
        riskFactor: 'Critical vulnerability to credential theft and drive-by malware downloads',
        countermeasureTitle: 'Adopt the "Never Click Directly" Protocol',
        countermeasureAction: 'Never click links inside unsolicited notifications. Open your browser independently and navigate to the official website manually.',
        countermeasureCategory: 'social'
      },
      {
        id: 'links-inspect-sometimes',
        label: 'I usually inspect the sender name, but might click if the logo and text match official branding',
        subtext: 'Sender display names are easily spoofed; visual logos can be copied verbatim',
        riskScore: 5,
        riskFactor: 'Vulnerable to spoofed display names and deceptive typosquatting domains',
        countermeasureTitle: 'Verify Top-Level Domain (TLD) and Certificate',
        countermeasureAction: 'Hover over hyperlinks to inspect the true destination domain (e.g., paypal-security.xyz is NOT paypal.com).',
        countermeasureCategory: 'social'
      },
      {
        id: 'links-independent-nav',
        label: 'I never click notification links; I open the official app or type the verified URL manually',
        subtext: 'Completely circumvents deceptive links and fake login clones',
        riskScore: 0,
        riskFactor: 'Zero-trust inbound communication posture eliminates phishing vector',
        countermeasureTitle: 'Phishing Awareness Hardened',
        countermeasureAction: 'Use in-app "Report Phishing" buttons to train spam filters for your organization or email provider.',
        countermeasureCategory: 'social'
      }
    ]
  },
  {
    id: 'q-app-permissions',
    category: 'privacy',
    categoryLabel: 'Privacy Exposure',
    title: 'Do you routinely audit smartphone and browser permissions (microphone, camera, contacts, background location)?',
    scenarioContext: 'Many free mobile games and novelty utilities harvest location telemetry and contact lists to monetize or sell to data broker networks.',
    whyItMatters: 'Excessive permissions allow shady apps to track your physical routine, record background audio, or exfiltrate your address book.',
    options: [
      {
        id: 'perm-never-check',
        label: 'I rarely check permissions and usually click "Allow" so the app works without friction',
        subtext: 'Grants continuous ambient surveillance capabilities to unknown vendors',
        riskScore: 8,
        riskFactor: 'Background location harvesting and silent access to private device sensors',
        countermeasureTitle: 'Conduct a Full Permissions Reset',
        countermeasureAction: 'Review iOS/Android Settings > Privacy > Permissions Manager. Revoke Location, Contacts, and Microphone for non-essential apps.',
        countermeasureCategory: 'privacy'
      },
      {
        id: 'perm-some-check',
        label: 'I select "Only While Using App" when prompted, but haven\'t reviewed older apps',
        subtext: 'Decent initial posture, but uninstalled or dormant apps retain previous data',
        riskScore: 4,
        riskFactor: 'Dormant apps retaining legacy access and unnecessary data retention',
        countermeasureTitle: 'Enable Automatic Permission Auto-Revoke',
        countermeasureAction: 'Enable Android/iOS "Revoke permissions if app is unused" and purge abandoned apps every 3 months.',
        countermeasureCategory: 'privacy'
      },
      {
        id: 'perm-strict-audit',
        label: 'I strictly restrict permissions to minimum necessity and regularly revoke unused access',
        subtext: 'Implements principle of least privilege on personal devices',
        riskScore: 0,
        riskFactor: 'Least-privilege policy denies unauthorized sensor and telemetry exfiltration',
        countermeasureTitle: 'Privacy Boundaries Enforced',
        countermeasureAction: 'Use browser extensions to block canvas fingerprinting and third-party tracking cookies.',
        countermeasureCategory: 'privacy'
      }
    ]
  },
  {
    id: 'q-backup-hygiene',
    category: 'backup',
    categoryLabel: 'Backup & Recovery',
    title: 'Do you have tested, regular backups of your critical documents and personal photos?',
    scenarioContext: 'Ransomware strains actively search for and encrypt local disk partitions, connected USB drives, and synchronized network shares.',
    whyItMatters: 'If ransomware encrypts your system or hardware suffers catastrophic failure, an isolated backup is the only guarantee of full data recovery.',
    options: [
      {
        id: 'backup-none',
        label: 'No, my files only exist on the device itself',
        subtext: 'Single hardware fault or ransomware incident results in permanent, irreversible loss',
        riskScore: 10,
        riskFactor: 'Catastrophic data loss exposure from ransomware, disk failure, or physical theft',
        countermeasureTitle: 'Establish a 3-2-1 Encrypted Backup Strategy',
        countermeasureAction: '3 copies of important files, on 2 different media types, with 1 copy stored offsite or in immutable cloud storage.',
        countermeasureCategory: 'backup'
      },
      {
        id: 'backup-sync-only',
        label: 'I rely entirely on real-time sync (Google Drive, Dropbox, OneDrive) without version history',
        subtext: 'If ransomware encrypts a local folder, corrupted files can immediately sync to cloud',
        riskScore: 5,
        riskFactor: 'Ransomware encryption may mirror to cloud storage before you can intervene',
        countermeasureTitle: 'Enable Cloud Version History & Air-Gapped Drive',
        countermeasureAction: 'Ensure your cloud provider keeps 30+ days of version history, and keep a disconnected external hard drive for cold offline backups.',
        countermeasureCategory: 'backup'
      },
      {
        id: 'backup-321-active',
        label: 'Yes, I follow an automated backup routine with immutable versioning and offline copies',
        subtext: 'Renders ransomware extortion impotent by enabling rapid system restoration',
        riskScore: 0,
        riskFactor: 'Resilient data recovery posture prevents ransomware coercion',
        countermeasureTitle: 'Resilience Strategy Operational',
        countermeasureAction: 'Perform a test restoration drill once every six months to confirm backup integrity.',
        countermeasureCategory: 'backup'
      }
    ]
  }
];

/**
 * Hardening Countermeasures for Defender Mode
 */
export const INITIAL_COUNTERMEASURES: HardeningCountermeasure[] = [
  {
    id: 'cm-mfa',
    title: 'Enable MFA with Authenticator App or Passkeys',
    category: 'account',
    categoryLabel: 'Account Security',
    impactScoreReduction: 12,
    riskTrigger: 'MFA Disabled or SMS-Only',
    threatImpact: 'An attacker who obtains your password via breach leaks or phishing has an immediate path to full account takeover.',
    defenseAction: 'Activate App-based TOTP (Aegis, 2FAS, Google Authenticator) or FIDO2 Passkeys on all email and financial portals.',
    implemented: false,
    difficulty: 'Quick (2 min)',
    actionGuideSteps: [
      'Navigate to Account Settings > Security on your primary email and identity accounts.',
      'Select "Two-Factor Authentication" or "Passkeys".',
      'Scan the QR code with an Authenticator app (e.g., Aegis, Bitwarden Authenticator, Google Authenticator).',
      'Download and save the 8-10 emergency backup recovery codes in a secure, encrypted offline vault.',
      'Verify the 6-digit code to finalize enforcement.'
    ]
  },
  {
    id: 'cm-password-manager',
    title: 'Deploy a Master Password Vault & Stop Password Reuse',
    category: 'password',
    categoryLabel: 'Password Security',
    impactScoreReduction: 14,
    riskTrigger: 'Password Reuse Across Services',
    threatImpact: 'A single breach on a low-security website instantly exposes the master credentials for your banking and primary inbox.',
    defenseAction: 'Store unique, 16+ character random passwords for every single login in an encrypted password manager.',
    implemented: false,
    difficulty: 'Moderate (10 min)',
    actionGuideSteps: [
      'Install an audited password manager (Bitwarden, 1Password, or Proton Pass).',
      'Choose a memorable 4-word passphrase as your Master Password (e.g., "correct-horse-battery-staple").',
      'Replace repeated passwords on your top 5 most sensitive accounts (Email, Bank, Cloud storage).',
      'Enable the browser extension to auto-fill credentials, preventing entry into fake phishing URLs.'
    ]
  },
  {
    id: 'cm-osint-sanitization',
    title: 'Sanitize Social Media OSINT & Obfuscate Security Answers',
    category: 'social',
    categoryLabel: 'Social Engineering Risk',
    impactScoreReduction: 10,
    riskTrigger: 'Publicly Visible Personal Details & PII',
    threatImpact: 'Attackers scrape birthdays, high schools, pet names, and family relations to answer account recovery prompts or engineer targeted spear-phishing lures.',
    defenseAction: 'Switch social accounts to Private, strip birth year, and treat security questions as secondary random passwords.',
    implemented: false,
    difficulty: 'Moderate (10 min)',
    actionGuideSteps: [
      'Audit Facebook/LinkedIn/Instagram settings and set profile visibility to "Friends Only".',
      'Remove publicly listed birth year, home address, and personal phone numbers.',
      'For websites requiring security questions, never type the true answer. Put a random generated string into your password manager notes.'
    ]
  },
  {
    id: 'cm-auto-updates',
    title: 'Enable Automatic Security Patching Across All Devices',
    category: 'device',
    categoryLabel: 'Device Security',
    impactScoreReduction: 9,
    riskTrigger: 'Delayed OS and Browser Updates',
    threatImpact: 'Attackers deploy automated vulnerability scanners targeting known CVEs that have public exploits available.',
    defenseAction: 'Turn on automatic background updates for Windows, macOS, Android, iOS, and all web browsers.',
    implemented: false,
    difficulty: 'Quick (2 min)',
    actionGuideSteps: [
      'Open System Settings > Windows Update or macOS Software Update.',
      'Toggle "Install updates automatically" and "Install security responses and system files".',
      'In your web browser (Chrome/Edge/Firefox), navigate to About to ensure it is running the latest stable branch.'
    ]
  },
  {
    id: 'cm-email-aliasing',
    title: 'Implement Email Aliasing & Disguise Primary Address',
    category: 'privacy',
    categoryLabel: 'Privacy Exposure',
    impactScoreReduction: 8,
    riskTrigger: 'Primary Email Publicly Indexed',
    threatImpact: 'Your true inbox is bombarded with targeted spear-phishing lures, credential stuffing attempts, and automated spam engines.',
    defenseAction: 'Use email alias forwarding (SimpleLogin, AnonAddy, iCloud Hide My Email) for online shopping and forums.',
    implemented: false,
    difficulty: 'Moderate (10 min)',
    actionGuideSteps: [
      'Sign up for an email alias forwarding service or use your provider\'s built-in feature.',
      'Create custom aliases when registering on newsletters or e-commerce sites.',
      'If an alias receives spam or is leaked in a vendor breach, disable that specific alias with one click without altering your primary inbox.'
    ]
  },
  {
    id: 'cm-backup-routine',
    title: 'Establish 3-2-1 Encrypted Offline Backups',
    category: 'backup',
    categoryLabel: 'Backup & Recovery',
    impactScoreReduction: 9,
    riskTrigger: 'Zero Backups / Only Real-Time Sync',
    threatImpact: 'Ransomware deployment or hardware corruption leads to permanent, non-recoverable data destruction and financial extortion.',
    defenseAction: 'Maintain versioned cloud snapshots plus a disconnected external drive for cold recovery.',
    implemented: false,
    difficulty: 'Advanced (30 min)',
    actionGuideSteps: [
      'Configure automated encrypted backups of your essential documents folder.',
      'Ensure cloud storage (OneDrive/Google Drive) has version history turned on so encrypted files can be rolled back.',
      'Copy your critical digital archive to an external hard drive once a month and disconnect the drive completely when finished.'
    ]
  }
];

/**
 * 7 Attack Scenarios for the Educational Attack Simulator
 * Strictly educational: Visual attack chains with no real exploit commands.
 */
export const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'scenario-phishing',
    title: 'The Deceptive Invoice Lure',
    userQuestion: 'What if I click a phishing link?',
    triggerHook: 'An urgent email claims: "Your account will be suspended within 2 hours unless you confirm billing info."',
    mitreTechnique: 'T1566.002 — Spearphishing Link',
    category: 'Social Engineering',
    estimatedSuccessRateWithoutDefense: '78% of untrained recipients enter credentials',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Initial Hook',
        attackerAction: 'Attacker registers a lookalike domain (e.g., paypaI-security-verify.net with a capital I) and sends a spoofed high-urgency message.',
        systemOrUserImpact: 'Victim feels psychological anxiety and opens the message without inspecting the true header.',
        technicalMechanism: 'Email header spoofing, deceptive display names, psychological pressure',
        severity: 'low'
      },
      {
        stepNumber: 2,
        phaseName: 'Link Click & Redirect',
        attackerAction: 'Link directs user through a series of open redirects to evade web reputation filters, landing on a cloned portal.',
        systemOrUserImpact: 'Victim arrives at a pixel-perfect replica of the authentic service login screen.',
        technicalMechanism: 'Open redirect bypass, automated CSS/HTML cloning from real origin',
        severity: 'moderate'
      },
      {
        stepNumber: 3,
        phaseName: 'Credential Interception',
        attackerAction: 'Victim types email and password into the fake form. The phishing server captures inputs in real-time.',
        systemOrUserImpact: 'Plaintext username and password stored in attacker\'s command database.',
        technicalMechanism: 'POST request exfiltration to attacker backend; reverse-proxy MITM framework (e.g. Evilginx concept)',
        severity: 'high'
      },
      {
        stepNumber: 4,
        phaseName: 'Session Hijacking & Takeover',
        attackerAction: 'If MFA is absent or basic, attacker authenticates immediately, revokes victim\'s active sessions, and changes recovery email.',
        systemOrUserImpact: 'Victim is permanently locked out of account; sensitive correspondence and connected services compromised.',
        technicalMechanism: 'API session token creation, recovery credential modification, unauthorized access',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Verify the exact domain in your browser URL bar before typing anything — do not trust display names.',
      '2. Never enter credentials following a link inside an unsolicited notification.',
      '3. Enforce FIDO2 WebAuthn / Passkeys, which are cryptographically bound to the real domain and cannot be phished.',
      '4. Report the message to your email provider to block the malicious domain for others.',
      '5. If clicked accidentally, immediately change credentials from an independent, clean browser window.'
    ],
    recommendedControl: 'FIDO2 Passkeys & Independent Navigation Protocol'
  },
  {
    id: 'scenario-password-reuse',
    title: 'The Automated Credential Stuffing Surge',
    userQuestion: 'What if I reuse the same password?',
    triggerHook: 'A fitness tracker forum you joined 6 years ago suffers a database breach and leaks hashed passwords.',
    mitreTechnique: 'T1110.004 — Credential Stuffing',
    category: 'Authentication',
    estimatedSuccessRateWithoutDefense: 'Over 65% of reused passwords crackable via rainbow tables',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Third-Party Data Breach',
        attackerAction: 'Unrelated forum database is dumped on dark-web forums, exposing millions of email/password combinations.',
        systemOrUserImpact: 'User is unaware their shared password is now part of a publicly circulating breach corpus.',
        technicalMechanism: 'SQL injection or unauthenticated S3 bucket leak on third-party vendor',
        severity: 'low'
      },
      {
        stepNumber: 2,
        phaseName: 'Offline Hash Cracking',
        attackerAction: 'Attacker processes weakly salted hashes using GPU clusters (Hashcat) and dictionary wordlists.',
        systemOrUserImpact: 'Password is recovered in plaintext within minutes.',
        technicalMechanism: 'GPU-accelerated hash cracking against MD5/SHA1 legacy databases',
        severity: 'moderate'
      },
      {
        stepNumber: 3,
        phaseName: 'Automated Credential Stuffing',
        attackerAction: 'Botnet runs automated login scripts trying the cracked email/password pair against thousands of banking, retail, and email portals.',
        systemOrUserImpact: 'High-volume distributed HTTP requests bypass basic rate limiting via rotating proxy networks.',
        technicalMechanism: 'Headless browser automation (Puppeteer) with residential proxy rotators',
        severity: 'high'
      },
      {
        stepNumber: 4,
        phaseName: 'Cascading Multi-Account Breach',
        attackerAction: 'Attacker hits successful logins on victim\'s primary email, e-commerce store, and streaming platforms.',
        systemOrUserImpact: 'Financial charges, identity impersonation, and collateral breach across all services sharing the password.',
        technicalMechanism: 'Automated API token harvesting and secondary order placement',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Eliminate all shared passwords: every single account must have an entirely distinct, randomly generated password.',
      '2. Use an audited password manager so you never have to remember complex strings.',
      '3. Turn on breach notifications on HaveIBeenPwned to know when your email surfaces in database dumps.',
      '4. Enforce Multi-Factor Authentication so cracked passwords alone are insufficient to log in.',
      '5. Immediately rotate any password that you suspect was used across multiple platforms.'
    ],
    recommendedControl: 'Password Manager with Unique 16+ Character Vault Entries'
  },
  {
    id: 'scenario-mfa-disabled',
    title: 'The Zero-Barrier Account Takeover',
    userQuestion: 'What if I disable MFA?',
    triggerHook: 'You find 2FA prompts tedious on your mobile phone and turn off secondary verification.',
    mitreTechnique: 'T1078.001 — Valid Accounts',
    category: 'Identity & Access',
    estimatedSuccessRateWithoutDefense: '99% of single-factor accounts breached once password is leaked',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Password Discovery',
        attackerAction: 'Attacker acquires password via infostealer malware log, phishing page, or past breach corpus.',
        systemOrUserImpact: 'First authentication factor is completely known to the threat actor.',
        technicalMechanism: 'Infostealer database purchase or brute-force credential stuffing',
        severity: 'moderate'
      },
      {
        stepNumber: 2,
        phaseName: 'Direct Login Execution',
        attackerAction: 'Attacker logs into the web console from a foreign IP address.',
        systemOrUserImpact: 'Authentication system recognizes valid credentials; with no MFA challenge, access is granted instantly.',
        technicalMechanism: 'Direct OAuth / Session token generation without secondary challenge barrier',
        severity: 'high'
      },
      {
        stepNumber: 3,
        phaseName: 'Persistence & Defense Lockout',
        attackerAction: 'Attacker adds their own phone number and hardware key, then logs out all other sessions.',
        systemOrUserImpact: 'Legitimate owner is completely locked out with no recourse; attacker now controls the recovery workflow.',
        technicalMechanism: 'MFA re-enrollment by adversary; recovery token overwrite',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Keep MFA enabled unconditionally on all email, banking, and identity providers.',
      '2. Upgrade from SMS 2FA to Authenticator Apps (TOTP) or Hardware Keys.',
      '3. Safely print and store emergency recovery codes in a secure physical location.',
      '4. Set up suspicious login alerts for new geographic regions or devices.'
    ],
    recommendedControl: 'Non-Negotiable MFA / Passkey Enforcement'
  },
  {
    id: 'scenario-unknown-app',
    title: 'The Trojanized Utility Infostealer',
    userQuestion: 'What if I install an unknown application?',
    triggerHook: 'You download a free "game cheat", "video enhancer", or cracked Adobe tool from a Discord link or torrent.',
    mitreTechnique: 'T1204.002 — User Execution: Malicious File',
    category: 'Malware',
    estimatedSuccessRateWithoutDefense: 'Over 90% of unsigned executables successfully bypass casual users',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Deceptive Packaging',
        attackerAction: 'Attacker bundles an infostealer (e.g. Lumma or RedLine) inside a working installer that appears harmless.',
        systemOrUserImpact: 'User accepts the User Account Control (UAC) elevation prompt assuming it is required for installation.',
        technicalMechanism: 'Binary packing, obfuscated PowerShell loaders, certificate evasion',
        severity: 'moderate'
      },
      {
        stepNumber: 2,
        phaseName: 'Silent Process Injection',
        attackerAction: 'Payload executes in background memory, injects into legitimate Windows processes (like explorer.exe), and queries local storage.',
        systemOrUserImpact: 'No obvious GUI signs; system fans may spin briefly while browser databases are scanned.',
        technicalMechanism: 'Process hollowing / reflective DLL injection, anti-sandbox checks',
        severity: 'high'
      },
      {
        stepNumber: 3,
        phaseName: 'Infostealer Exfiltration',
        attackerAction: 'Malware parses Chrome/Firefox SQLite databases: dumps saved passwords, extracts session tokens, and scrapes crypto wallet files.',
        systemOrUserImpact: 'Zipped archive sent to attacker Telegram bot or C2 server within 15 seconds.',
        technicalMechanism: 'SQLite database parsing, Windows DPAPI decryption, HTTPS C2 exfiltration',
        severity: 'critical'
      },
      {
        stepNumber: 4,
        phaseName: 'Session Replay Attack',
        attackerAction: 'Attacker imports your active session cookies into their browser, bypassing MFA entirely because the session is already authenticated.',
        systemOrUserImpact: 'Attacker browses your webmail and social profiles as you, without triggering a new login prompt.',
        technicalMechanism: 'Pass-the-Cookie / Session Token replay attack',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Never download or execute cracked software, keygens, or pirated tools.',
      '2. Only install software from official developer websites or curated app stores.',
      '3. Test suspicious binaries in an isolated sandbox (Windows Sandbox) or upload to VirusTotal.',
      '4. Store passwords inside a dedicated password vault rather than saving them in browser auto-fill.',
      '5. Run active, updated real-time endpoint protection (Microsoft Defender / CrowdStrike).'
    ],
    recommendedControl: 'Application Whitelisting & Never Running Untrusted Binaries'
  },
  {
    id: 'scenario-public-wifi',
    title: 'The Rogue Evil Twin Hotspot',
    userQuestion: 'What if I use public Wi-Fi carelessly?',
    triggerHook: 'At an airport, your laptop auto-connects to an open network named "Free_Airport_HighSpeed_WiFi".',
    mitreTechnique: 'T1040 — Network Sniffing & Rogue AP',
    category: 'Network Security',
    estimatedSuccessRateWithoutDefense: 'High exposure of unencrypted DNS, metadata, and local LAN services',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Rogue AP Beaconing',
        attackerAction: 'Attacker deploys a portable Wi-Fi access point (e.g. Wi-Fi Pineapple) broadcasting common SSID names.',
        systemOrUserImpact: 'Devices with "Auto-Connect" enabled silently latch onto the attacker\'s stronger signal.',
        technicalMechanism: 'Beacon frame spoofing, probe request response injection',
        severity: 'moderate'
      },
      {
        stepNumber: 2,
        phaseName: 'DNS Hijacking & Captive Portal Clone',
        attackerAction: 'Attacker acts as default gateway, intercepting DNS queries and presenting a spoofed captive portal asking for Google or social login.',
        systemOrUserImpact: 'User believes they must "sign in with Google to access free internet".',
        technicalMechanism: 'DNS spoofing, captive portal interception, fake OAuth consent capture',
        severity: 'high'
      },
      {
        stepNumber: 3,
        phaseName: 'Local Network Probing',
        attackerAction: 'Attacker scans your device\'s open ports, shared folders (SMB), and broadcast services (AirDrop/mDNS).',
        systemOrUserImpact: 'Unprotected network shares or unpatched local network daemon vulnerabilities exposed.',
        technicalMechanism: 'Nmap subnet scanning, NetBIOS/SMB enumeration',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Disable "Auto-connect to open Wi-Fi networks" in device network settings.',
      '2. Connect through a trusted encrypted VPN before transmitting any data on public Wi-Fi.',
      '3. Prefer your personal smartphone cellular hotspot over untrusted public hotspots.',
      '4. Never enter Google, Apple, or email credentials into captive portal Wi-Fi splash screens.',
      '5. Turn off file sharing and AirDrop/Nearby Share when on public networks.'
    ],
    recommendedControl: 'Encrypted WireGuard VPN & Cellular Hotspot Preference'
  },
  {
    id: 'scenario-lost-phone',
    title: 'The Lost Device Extraction Drill',
    userQuestion: 'What if my phone is lost?',
    triggerHook: 'You accidentally leave your smartphone in a rideshare vehicle or on a train seat.',
    mitreTechnique: 'T1200 — Hardware Additions & Physical Access',
    category: 'Physical & Mobile',
    estimatedSuccessRateWithoutDefense: 'Full access if lock screen passcode is trivial (e.g. 1234, 0000) or notifications show OTPs',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Physical Possession',
        attackerAction: 'Finder or bad actor attempts lock screen bypass and inspects lock screen notifications.',
        systemOrUserImpact: 'If lock screen preview is enabled, incoming SMS verification codes and private messages are readable without unlocking.',
        technicalMechanism: 'Lock screen notification inspection, simple passcode brute-force',
        severity: 'moderate'
      },
      {
        stepNumber: 2,
        phaseName: 'SIM Card Extraction',
        attackerAction: 'Attacker ejects the physical SIM card and inserts it into their own burner phone.',
        systemOrUserImpact: 'Attacker now receives all incoming phone calls and SMS 2FA verification codes directed to your number.',
        technicalMechanism: 'Physical SIM transplantation; absence of SIM PIN protection',
        severity: 'high'
      },
      {
        stepNumber: 3,
        phaseName: 'Account Takeover via SMS Password Reset',
        attackerAction: 'Attacker navigates to popular apps, clicks "Forgot Password", and receives the reset OTP directly on their phone.',
        systemOrUserImpact: 'Bank accounts, messaging apps, and email recovered and taken over before you reach a computer.',
        technicalMechanism: 'SMS-based password reset exploitation',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Enable a robust 6+ digit alphanumeric passcode or strong biometric lock.',
      '2. Hide sensitive notification previews on the lock screen (Settings > Notifications > Show Previews: When Unlocked).',
      '3. Lock your SIM card with a SIM PIN so it cannot be used if transferred to another handset.',
      '4. Use eSIM instead of physical SIM cards to prevent physical removal.',
      '5. Familiarize yourself with Apple "Find My" or Google "Find My Device" to initiate remote wipe immediately.'
    ],
    recommendedControl: 'SIM PIN Lock, eSIM, & Remote Device Wipe Ready'
  },
  {
    id: 'scenario-ransomware',
    title: 'The Ransomware Encryption Lockout',
    userQuestion: 'What if ransomware reaches my device?',
    triggerHook: 'A malicious email attachment disguised as an "urgent shipping invoice.pdf.exe" is double-clicked.',
    mitreTechnique: 'T1486 — Data Encrypted for Impact',
    category: 'Malware & Extortion',
    estimatedSuccessRateWithoutDefense: 'Permanent data destruction or extortion without offline backups',
    chainSteps: [
      {
        stepNumber: 1,
        phaseName: 'Execution & Privilege Escalation',
        attackerAction: 'Ransomware executable runs, deletes Windows Volume Shadow Copies (vssadmin delete shadows) to prevent easy rollback.',
        systemOrUserImpact: 'Local system recovery restore points are wiped from disk.',
        technicalMechanism: 'Command execution, shadow copy deletion, disabling recovery services',
        severity: 'high'
      },
      {
        stepNumber: 2,
        phaseName: 'Rapid Cryptographic Encryption',
        attackerAction: 'Malware recursively traverses local drives, mapped network shares, and external USBs, encrypting documents with military-grade AES-256 / RSA.',
        systemOrUserImpact: 'All photos, documents, and spreadsheets gain encrypted extensions (e.g. .locked) and become unreadable.',
        technicalMechanism: 'Asymmetric/symmetric hybrid encryption, multithreaded file I/O',
        severity: 'critical'
      },
      {
        stepNumber: 3,
        phaseName: 'Extortion Note Drop',
        attackerAction: 'Desktop wallpaper is replaced with a ransom note demanding cryptocurrency payment within 72 hours for the decryption key.',
        systemOrUserImpact: 'Total operational paralysis; paying ransom provides no guarantee of key delivery and funds criminal syndicates.',
        technicalMechanism: 'Ransom note creation, C2 telemetry transmission',
        severity: 'critical'
      }
    ],
    defenseChecklist: [
      '1. Never pay the ransom — it funds criminal enterprises and over 40% never get their data back.',
      '2. Maintain strict 3-2-1 offline/air-gapped backups that ransomware cannot reach over the network.',
      '3. Keep operating systems and endpoint security engines updated with behavioral heuristics.',
      '4. Show file extensions in Windows Explorer (preventing invoice.pdf.exe deception).',
      '5. Disconnect the infected machine from the network immediately to prevent lateral spread.'
    ],
    recommendedControl: 'Immutable 3-2-1 Backups & Instant Network Isolation'
  }
];

/**
 * Digital Exposure Map Nodes (Downstream flow)
 * USER → EMAIL → SOCIAL MEDIA → PUBLIC INFO → SOCIAL ENGINEERING → PHISHING → ACCOUNT COMPROMISE
 */
export const EXPOSURE_MAP_NODES: ExposureNode[] = [
  {
    id: 'node-user',
    label: 'Digital Identity (User)',
    shortTag: 'ROOT ENTITY',
    category: 'Identity Core',
    summary: 'The human individual, habits, devices, and baseline online behaviors.',
    riskDescription: 'The human factor is involved in over 90% of all cybersecurity breaches, driven by habit convenience, cognitive fatigue, and lack of visibility into digital footprint.',
    whyItMatters: 'Every online account, credential, and communication channel traces back to your personal identity.',
    exampleScenario: 'An individual uses familiar personal names, birth years, and predictable passwords across decades of digital accounts.',
    recommendedProtection: 'Cultivate cybersecurity skepticism: adopt a zero-trust mindset toward unsolicited requests and separate personal identity from public-facing profiles.',
    severity: 'low',
    downstreamIds: ['node-email']
  },
  {
    id: 'node-email',
    label: 'Primary Email Address',
    shortTag: 'CENTRAL HUB',
    category: 'Communication Anchor',
    summary: 'The universal recovery anchor for password resets, banking, government, and personal accounts.',
    riskDescription: 'If an attacker discovers or compromises your primary email, they inherit the master key to reset passwords across virtually every website you use.',
    whyItMatters: 'It acts as the single point of failure in modern identity architectures.',
    exampleScenario: 'Your email address is registered on dozens of online stores and leaked in multiple vendor database breaches over time.',
    recommendedProtection: 'Enforce hardware security key (FIDO2) or Passkey MFA on your email. Use masked email aliases for non-critical signups.',
    severity: 'moderate',
    downstreamIds: ['node-social', 'node-public-info']
  },
  {
    id: 'node-social',
    label: 'Social Media Footprint',
    shortTag: 'OSINT SOURCE',
    category: 'Public Footprint',
    summary: 'Public posts, employer details, tagged photos, birthdays, hobbies, and mutual friend connections.',
    riskDescription: 'Over-sharing grants cyber adversaries all the personal trivia needed to solve recovery questions or simulate credible authority figures.',
    whyItMatters: 'Open-source intelligence (OSINT) allows attackers to profile your schedule, affiliations, and vulnerabilities with zero technical intrusion.',
    exampleScenario: 'A public LinkedIn profile shows your corporate role; an Instagram post reveals you are traveling out of the country this week.',
    recommendedProtection: 'Audit privacy settings, restrict profile visibility to trusted friends, and never post real-time flight tickets or vacation dates publicly.',
    severity: 'moderate',
    downstreamIds: ['node-public-info', 'node-social-eng']
  },
  {
    id: 'node-public-info',
    label: 'Public Aggregation & Data Brokers',
    shortTag: 'DATA HARVEST',
    category: 'Information Recon',
    summary: 'Aggregated dossiers compiled by people-search sites, public voter registries, and leaked forum databases.',
    riskDescription: 'Automated scraping tools cross-reference your phone number, historical home addresses, relatives, and breached passwords.',
    whyItMatters: 'Provides cybercriminals with a comprehensive target dossier without alerting you.',
    exampleScenario: 'An attacker looks up your phone number on a public broker site to discover your home address and relatives\' names.',
    recommendedProtection: 'Submit opt-out requests to major data brokers (DeleteMe, Incogni, or manual requests) and avoid using your phone number for public listings.',
    severity: 'high',
    downstreamIds: ['node-social-eng', 'node-phishing']
  },
  {
    id: 'node-social-eng',
    label: 'Social Engineering Vector',
    shortTag: 'PSYCHOLOGICAL LURE',
    category: 'Human Exploitation',
    summary: 'Tailored manipulation using psychological triggers like urgency, authority, fear, or sympathy.',
    riskDescription: 'Instead of hacking software code, adversaries hack human psychology. Pretexting calls or messages sound hyper-realistic because they cite real details about your life.',
    whyItMatters: 'Bypasses technical firewalls by convincing the human operator to authorize unauthorized transactions or surrender access.',
    exampleScenario: 'Caller pretends to be from your bank\'s fraud division, quoting your recent public hotel stay to convince you to read back a verification code.',
    recommendedProtection: 'Hang up and call back on the official published number on the back of your credit card. Never read OTP codes over the phone.',
    severity: 'high',
    downstreamIds: ['node-phishing']
  },
  {
    id: 'node-phishing',
    label: 'Spear-Phishing Attack',
    shortTag: 'EXECUTION VECTOR',
    category: 'Technical Delivery',
    summary: 'Targeted deceptive communications delivering malicious links, spoofed login forms, or infected payloads.',
    riskDescription: 'Pixel-perfect replicas of authentic services designed to steal session tokens, passwords, and authorization tokens.',
    whyItMatters: 'The primary technical gateway responsible for initiating major data breaches and ransomware incidents.',
    exampleScenario: 'An email disguised as an urgent payroll or security update directs you to a lookalike portal with a spoofed URL.',
    recommendedProtection: 'Check URL domains meticulously; use password managers that refuse to auto-fill credentials into mismatched domain names.',
    severity: 'critical',
    downstreamIds: ['node-account-comp']
  },
  {
    id: 'node-account-comp',
    label: 'Account Compromise & Takeover',
    shortTag: 'CRITICAL IMPACT',
    category: 'Final Impact',
    summary: 'Full unauthorized adversary takeover: credential modification, financial draining, and lateral impersonation.',
    riskDescription: 'The attacker controls your digital identity. They can lock you out permanently, contact your friends and coworkers to solicit funds, and leak sensitive files.',
    whyItMatters: 'Causes severe financial loss, emotional distress, identity theft, and reputational damage that takes months or years to remediate.',
    exampleScenario: 'Adversary changes your email recovery address, locks you out, and starts scamming your contacts or blackmailing with private photos.',
    recommendedProtection: 'Immediate incident response: revoke all active sessions, contact official support, notify your bank, and alert friends through alternate channels.',
    severity: 'critical',
    downstreamIds: []
  }
];

/**
 * 13 Beginner-friendly Cybersecurity Learning Modules
 */
export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-basics',
    title: 'Cybersecurity Basics',
    category: 'Fundamentals',
    readTime: '4 min read',
    summary: 'The fundamental principles of digital security: Confidentiality, Integrity, and Availability (The CIA Triad) and modern threat posture.',
    realWorldExample: 'A small business employee leaves their workstation unlocked during lunch; an opportunistic visitor copies customer spreadsheets onto an unencrypted USB drive.',
    warningSigns: [
      'Unexplained popups or sudden sluggishness on devices',
      'Unknown applications appearing in your startup list',
      'Sudden logouts from your regular services'
    ],
    preventionTips: [
      'Lock your screen every time you step away (Win + L or Cmd + Ctrl + Q)',
      'Keep software updated and never share accounts with coworkers',
      'Treat all digital communication with healthy skepticism'
    ],
    quickQuiz: {
      question: 'What does the "C" in the CIA Triad stand for in cybersecurity?',
      options: ['Connection', 'Confidentiality', 'Cryptography', 'Complexity'],
      correctIndex: 1,
      explanation: 'Confidentiality ensures that sensitive information is accessible only to authorized entities and kept private from unauthorized viewers.'
    }
  },
  {
    id: 'mod-phishing',
    title: 'Phishing & Smishing Anatomy',
    category: 'Threat Vectors',
    readTime: '5 min read',
    summary: 'How attackers craft deceptive emails, SMS messages, and fake websites to manipulate users into surrendering credentials.',
    realWorldExample: 'A customer receives a text message: "Your package delivery failed due to missing postal fees of $1.50. Click here to confirm." The link leads to a clone site that steals debit card details.',
    warningSigns: [
      'Artificial urgency ("Act within 24 hours or account deleted")',
      'Mismatched sender domain (e.g. support@netflix-billing-resolve.xyz)',
      'Generic greetings like "Dear Customer" instead of your actual name'
    ],
    preventionTips: [
      'Always inspect the sender address and true destination URL',
      'Navigate to services independently rather than clicking embedded links',
      'Never send passwords, PINs, or OTPs through email or text'
    ],
    quickQuiz: {
      question: 'Why do phishing emails frequently create extreme urgency?',
      options: [
        'To speed up email delivery protocols',
        'To cause emotional panic and bypass logical scrutiny',
        'Because email servers expire after 10 minutes',
        'To comply with government privacy laws'
      ],
      correctIndex: 1,
      explanation: 'Attackers manufacture panic (fear of account suspension, fines, or FOMO) to short-circuit analytical thinking so victims click impulsively.'
    }
  },
  {
    id: 'mod-passwords',
    title: 'Password Security & Managers',
    category: 'Fundamentals',
    readTime: '4 min read',
    summary: 'Why human-chosen passwords fail, how automated password crackers work, and why password vaults are essential for modern hygiene.',
    realWorldExample: 'A user creates "P@ssword2024!" for all accounts. Hashcat cracks this rule-based pattern in under 4 seconds during a credential stuffing wave.',
    warningSigns: [
      'Using familiar names, birthdays, or keyboard walks (qwerty, 123456)',
      'Reusing the same password or slight variations across multiple sites',
      'Writing credentials on sticky notes affixed to your monitor'
    ],
    preventionTips: [
      'Use a password manager (Bitwarden, 1Password) to generate 16+ character random strings',
      'Use memorable multi-word passphrases for your master key (e.g., "velvet-comet-orbit-puzzle")',
      'Never save sensitive credentials in plain text files or browser unencrypted stores'
    ],
    quickQuiz: {
      question: 'Which of the following makes a password most resilient against modern brute-force cracking?',
      options: [
        'A short 7-letter word with one exclamation mark',
        'A long, random 16+ character passphrase',
        'Your pet name followed by your birth year',
        'The word "Admin" with alternating capitalization'
      ],
      correctIndex: 1,
      explanation: 'Length and entropy drastically increase the computational power required to crack a password, rendering brute-force attacks mathematically infeasible.'
    }
  },
  {
    id: 'mod-mfa',
    title: 'MFA, 2FA, & Passkeys',
    category: 'Fundamentals',
    readTime: '5 min read',
    summary: 'Multi-Factor Authentication (MFA) requires two distinct pieces of evidence: something you know, something you have, or something you are.',
    realWorldExample: 'An attacker steals a user\'s password via a breach, but cannot log in because they do not have the user\'s physical smartphone or hardware security key.',
    warningSigns: [
      'Relying solely on passwords for banking or email access',
      'Unsolicited push notifications asking "Is this you signing in?" (MFA fatigue attack)',
      'Using SMS verification when app-based TOTP or Passkeys are supported'
    ],
    preventionTips: [
      'Switch from SMS OTPs to authenticator apps (Aegis, Google Authenticator) or Passkeys',
      'Never approve an MFA push notification that you did not explicitly initiate',
      'Securely save your offline recovery codes when configuring 2FA'
    ],
    quickQuiz: {
      question: 'Why are Authenticator Apps (TOTP) safer than SMS text message codes?',
      options: [
        'SMS codes expire too slowly',
        'SMS is vulnerable to SIM-swapping and cellular network interception',
        'Authenticator apps require Wi-Fi to generate codes',
        'SMS codes cost money to receive'
      ],
      correctIndex: 1,
      explanation: 'Threat actors can trick mobile carriers into transferring your phone number to their SIM card (SIM swapping), intercepting all SMS verification codes.'
    }
  },
  {
    id: 'mod-malware',
    title: 'Malware Anatomy & Defense',
    category: 'Threat Vectors',
    readTime: '5 min read',
    summary: 'Understanding Trojans, viruses, keyloggers, and infostealers: how malicious code enters systems and silently exfiltrates private data.',
    realWorldExample: 'A user downloads a free video converter from a forum; the binary runs a background Lumma infostealer that copies browser session cookies to a remote server.',
    warningSigns: [
      'Sudden high CPU or GPU usage while idle',
      'Browser defaulting to an unfamiliar search engine',
      'Antivirus alerts indicating blocked memory injection or suspicious PowerShell calls'
    ],
    preventionTips: [
      'Never download pirated or cracked software',
      'Keep your operating system and web browser updated automatically',
      'Keep endpoint security (Windows Defender) active and running real-time scans'
    ],
    quickQuiz: {
      question: 'What is the primary function of modern "Infostealer" malware?',
      options: [
        'To format your hard drive immediately',
        'To silently extract saved passwords, browser session cookies, and crypto wallets',
        'To show humorous popups on your desktop',
        'To speed up your internet connection'
      ],
      correctIndex: 1,
      explanation: 'Modern infostealers specialize in stealthily harvesting sensitive credentials, browser cookies, and session tokens to sell on cybercrime marketplaces.'
    }
  },
  {
    id: 'mod-ransomware',
    title: 'Ransomware Survival Guide',
    category: 'Threat Vectors',
    readTime: '6 min read',
    summary: 'Ransomware encrypts your personal files and holds the decryption key hostage. Learn defense, containment, and recovery protocols.',
    realWorldExample: 'A hospital employee opens an invoice attachment; ransomware spreads laterally across the local network and locks patient records within 2 hours.',
    warningSigns: [
      'Files suddenly gaining strange extensions like .locked or .enc',
      'Volume Shadow Copies being unexpectedly deleted via command prompt',
      'A text or HTML file appearing on desktop named "README_TO_DECRYPT"'
    ],
    preventionTips: [
      'Maintain automated 3-2-1 offline/cloud backups with version history',
      'Never enable Office macros on unsolicited documents from external senders',
      'Immediately unplug ethernet cables and disconnect Wi-Fi if ransomware behavior is spotted'
    ],
    quickQuiz: {
      question: 'Why do security experts strongly advise AGAINST paying cybercrime ransoms?',
      options: [
        'Ransoms are illegal in all countries',
        'Paying provides no guarantee of key return and funds future cyber attacks',
        'Cryptocurrency cannot be sent during an attack',
        'Ransomware files decrypt themselves automatically after 10 days'
      ],
      correctIndex: 1,
      explanation: 'Over 40% of victims who pay never recover all their data, and payment actively incentivizes and finances criminal syndicates to continue targeting others.'
    }
  },
  {
    id: 'mod-social-eng',
    title: 'Social Engineering & Vishing',
    category: 'Threat Vectors',
    readTime: '5 min read',
    summary: 'How attackers exploit authority, trust, fear, and curiosity via phone calls (vishing), messages, and physical pretexting.',
    realWorldExample: 'An attacker calls an employee pretending to be the internal IT helpdesk, demanding they verify their login token to "fix an urgent system glitch".',
    warningSigns: [
      'Caller demands immediate action without allowing you to verify their identity',
      'Requests for one-time passwords (OTPs) or remote desktop software (AnyDesk/TeamViewer)',
      'Caller gets aggressive or dismissive when asked for verification details'
    ],
    preventionTips: [
      'Never read one-time SMS verification codes or approve login pushes for someone on the phone',
      'Hang up and initiate the call independently through official customer support channels',
      'Establish a family "safe word" for emergency verification against AI voice clone scams'
    ],
    quickQuiz: {
      question: 'What should you do if someone claiming to be your bank calls and asks for your 6-digit OTP?',
      options: [
        'Read the code quickly so your account isn\'t blocked',
        'Hang up immediately; legitimate banks never ask for your one-time passwords',
        'Ask them to wait while you transfer your money',
        'Give them a fake password instead'
      ],
      correctIndex: 1,
      explanation: 'Banks and legitimate institutions explicitly state that their representatives will NEVER ask you to disclose your one-time passwords or security codes over the phone.'
    }
  },
  {
    id: 'mod-identity-theft',
    title: 'Identity Theft & Credential Protection',
    category: 'Data & Privacy',
    readTime: '5 min read',
    summary: 'How stolen personally identifiable information (PII) is weaponized to open fraudulent credit lines, file false tax claims, and clone identities.',
    realWorldExample: 'A bad actor uses a victim\'s leaked Social Security/national ID number and date of birth to apply for online payday loans in their name.',
    warningSigns: [
      'Unexplained credit score drops or notices about accounts you never opened',
      'Missing physical postal mail or bank statements',
      'Calls from debt collection agencies regarding unfamiliar debt'
    ],
    preventionTips: [
      'Freeze your credit reports with major credit bureaus (Equifax, Experian, TransUnion)',
      'Shred physical documents containing sensitive identifiers before disposal',
      'Regularly monitor credit statements and breach notification services'
    ],
    quickQuiz: {
      question: 'What is the most effective free defense against unauthorized credit accounts being opened in your name?',
      options: [
        'Changing your home address',
        'Freezing your credit with the major credit bureaus',
        'Deleting your social media accounts',
        'Closing all your credit cards'
      ],
      correctIndex: 1,
      explanation: 'A credit freeze restricts access to your credit report, preventing lenders and fraudsters from opening new credit lines in your name.'
    }
  },
  {
    id: 'mod-network-security',
    title: 'Network Security & Public Wi-Fi',
    category: 'Data & Privacy',
    readTime: '5 min read',
    summary: 'Protecting your local perimeter: securing home Wi-Fi routers, avoiding Evil Twin rogue hotspots, and deploying encrypted tunnels.',
    realWorldExample: 'An attacker sets up a Wi-Fi hotspot named "Coffee_Shop_Guest" next to the real one, intercepting local network requests from connected customers.',
    warningSigns: [
      'Multiple identical Wi-Fi names with different signal strengths',
      'Browser warning about invalid SSL/TLS security certificates',
      'Public Wi-Fi networks requiring you to install a device certificate or software'
    ],
    preventionTips: [
      'Change default admin credentials on your home Wi-Fi router immediately',
      'Use WPA3 or WPA2-AES encryption with a strong Wi-Fi passphrase',
      'Use a trusted WireGuard VPN or cellular personal hotspot when outside your home'
    ],
    quickQuiz: {
      question: 'What is an "Evil Twin" Wi-Fi attack?',
      options: [
        'When your router has two antennas',
        'A rogue Wi-Fi access point spoofing the name of a legitimate trusted network',
        'A virus that infects two computers simultaneously',
        'A cyber attack that happens only at midnight'
      ],
      correctIndex: 1,
      explanation: 'An Evil Twin attack involves a threat actor setting up a fraudulent Wi-Fi hotspot with the exact same SSID as a trusted network to intercept victim traffic.'
    }
  },
  {
    id: 'mod-privacy',
    title: 'Digital Privacy & Data Footprints',
    category: 'Data & Privacy',
    readTime: '5 min read',
    summary: 'Minimizing your online attack surface: managing browser fingerprinting, app permissions, tracker cookies, and data broker catalogs.',
    realWorldExample: 'A smartphone flashlight app requests background location and contact access, secretly sending location telemetry to third-party ad brokers.',
    warningSigns: [
      'Apps demanding permissions unnecessary for their core utility',
      'Seeing hyper-specific ads based on private verbal conversations or location',
      'Finding your phone number and home address indexed on public people-search directories'
    ],
    preventionTips: [
      'Use privacy-focused browsers or extensions (uBlock Origin) to block trackers',
      'Review smartphone permissions and revoke Location and Contacts for non-essential apps',
      'Use email aliases (SimpleLogin, AnonAddy) to isolate online accounts'
    ],
    quickQuiz: {
      question: 'Why should a flashlight or calculator app NOT have access to your contacts or location?',
      options: [
        'It makes the screen dimmer',
        'Violates the principle of least privilege and risks unauthorized data harvesting',
        'It consumes too much battery power',
        'Calculators need internet to do multiplication'
      ],
      correctIndex: 1,
      explanation: 'Applications should only request permissions strictly required to perform their intended function (least privilege). Unrelated access often indicates data monetization.'
    }
  },
  {
    id: 'mod-owasp',
    title: 'OWASP Top 10 for Everyone',
    category: 'Enterprise & SOC',
    readTime: '6 min read',
    summary: 'The Open Worldwide Application Security Project (OWASP) Top 10 web vulnerabilities explained in human, practical terms.',
    realWorldExample: 'A website fails to validate input in its search bar; an attacker submits SQL commands that dump the entire user credentials database (SQL Injection).',
    warningSigns: [
      'Websites allowing arbitrary URL ID manipulation (e.g. site.com/user?id=12 changing to id=13 to view someone else\'s profile - BOLA / IDOR)',
      'Webpages failing to sanitize user input leading to script execution (XSS)',
      'Security headers missing from web server responses'
    ],
    preventionTips: [
      'Never trust client-side data validation alone; sanitize and parameterize all queries',
      'Implement strict Role-Based Access Control (RBAC) on all backend API endpoints',
      'Audit dependencies and third-party packages regularly for known CVEs'
    ],
    quickQuiz: {
      question: 'What is an "IDOR" (Insecure Direct Object Reference) / Broken Object Level Authorization flaw?',
      options: [
        'When a door lock doesn\'t close',
        'When modifying an ID in a URL allows a user to access another user\'s private data without permission',
        'A bug that turns web text upside down',
        'When your computer monitor flickers'
      ],
      correctIndex: 1,
      explanation: 'IDOR occurs when an application exposes a reference to an internal object (like user ID or account number) without verifying if the requesting user is authorized to access it.'
    }
  },
  {
    id: 'mod-incident-response',
    title: 'Incident Response Playbook',
    category: 'Enterprise & SOC',
    readTime: '6 min read',
    summary: 'What to do during a suspected compromise: containment, credential invalidation, forensic preservation, and structured recovery.',
    realWorldExample: 'An executive discovers an unauthorized login to their Microsoft 365 account from Eastern Europe. The response team immediately revokes all active refresh tokens.',
    warningSigns: [
      'Email rules silently auto-forwarding incoming messages to an unknown external mailbox',
      'Password reset emails arriving that you did not trigger',
      'New unrecognized devices listed in your logged-in sessions list'
    ],
    preventionTips: [
      'Immediately isolate the affected device from the local network and internet',
      'Reset credentials from a verified clean secondary device, never the compromised machine',
      'Inspect email forwarding rules, registered MFA devices, and active OAuth app grants'
    ],
    quickQuiz: {
      question: 'If you suspect your primary computer is infected with active malware, what is the critical first step?',
      options: [
        'Check your bank balance from that same computer',
        'Disconnect it from the network (unplug ethernet / turn off Wi-Fi) to contain the spread',
        'Restart the computer 10 times in a row',
        'Post on social media about it from that computer'
      ],
      correctIndex: 1,
      explanation: 'Isolating the device immediately severs the attacker\'s Command & Control (C2) channel and prevents malware from spreading laterally or continuing exfiltration.'
    }
  },
  {
    id: 'mod-soc',
    title: 'SOC Fundamentals & Threat Detection',
    category: 'Enterprise & SOC',
    readTime: '5 min read',
    summary: 'How Security Operations Centers (SOC) monitor telemetry, correlate SIEM logs, triage alerts, and hunt adversaries across networks.',
    realWorldExample: 'A SOC analyst notices a spike in failed SSH logins from multiple IPs within 30 seconds followed by an abnormal 2 GB outbound transfer, triggering an automatic firewall block.',
    warningSigns: [
      'Unusual outbound data spikes during non-working hours',
      'Multiple failed authentication attempts followed by immediate privilege escalation',
      'Endpoint Detection and Response (EDR) flagging abnormal process execution trees'
    ],
    preventionTips: [
      'Centralize logging and maintain at least 90 days of audit logs',
      'Set automated alert thresholds for abnormal geographic logins and data exfiltration',
      'Conduct routine tabletop exercises simulating ransomware and credential theft scenarios'
    ],
    quickQuiz: {
      question: 'What is the primary role of a Security Operations Center (SOC)?',
      options: [
        'To manufacture computer hardware',
        'To continuously monitor, detect, analyze, and respond to cybersecurity threats',
        'To sell software licenses to customers',
        'To run marketing campaigns for antivirus products'
      ],
      correctIndex: 1,
      explanation: 'A SOC is the centralized security team responsible for maintaining organizational cybersecurity posture through 24/7 detection, triage, and rapid incident response.'
    }
  }
];

/**
 * 10 Comprehensive Security Awareness Quiz Questions
 */
export const SECURITY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'You receive an email claiming to be from your cloud storage provider stating: "Storage full. Click here to verify your account or all files will be deleted in 24 hours." What is your safest course of action?',
    context: 'Threat Vector: High-Urgency Phishing Deception',
    options: [
      'Click the link immediately to prevent file deletion',
      'Reply to the email asking if this is legitimate',
      'Do not click the link; open your browser independently and navigate to the provider\'s official site',
      'Forward the email to 5 friends to see if they received it'
    ],
    correctIndex: 2,
    explanation: 'Independent navigation completely circumvents fake lookalike domains and credential harvesting forms. Legitimate providers never give 24-hour file deletion ultimatums without prior notice.',
    category: 'Phishing Defense'
  },
  {
    id: 'quiz-2',
    question: 'Why is using the same strong, complex password across 10 different websites dangerous?',
    context: 'Threat Vector: Credential Stuffing & Blast Radius',
    options: [
      'It takes too long to type on mobile keyboards',
      'If any single website gets breached, attackers can use that password to access all other 9 accounts',
      'Complex passwords expire automatically every week',
      'Browsers refuse to remember the same password twice'
    ],
    correctIndex: 1,
    explanation: 'Password reuse creates a shared blast radius. Attackers take credentials leaked from one compromised platform and feed them into automated bots targeting hundreds of other major services.',
    category: 'Password Hygiene'
  },
  {
    id: 'quiz-3',
    question: 'Which of the following Multi-Factor Authentication (MFA) methods is most resistant to modern phishing attacks?',
    context: 'Threat Vector: Adversary-in-the-Middle (AiTM) Phishing',
    options: [
      'SMS text message verification codes',
      'Email verification links',
      'FIDO2 Hardware Security Keys (e.g. YubiKey) or Passkeys',
      'Answering your mother\'s maiden name'
    ],
    correctIndex: 2,
    explanation: 'FIDO2 / WebAuthn cryptographic keys and Passkeys are bound to the specific domain in the browser address bar. Even if a user visits a fake phishing URL, the hardware key will refuse to authenticate.',
    category: 'Authentication'
  },
  {
    id: 'quiz-4',
    question: 'You are waiting at an international airport and see a free open Wi-Fi network called "Airport_Complimentary_WiFi". What should you do before checking your bank account?',
    context: 'Threat Vector: Rogue APs & Man-In-The-Middle Interception',
    options: [
      'Log into your bank directly because the name contains "Airport"',
      'Disable Wi-Fi and use your smartphone\'s cellular data, or connect via a trusted encrypted VPN',
      'Ask the person next to you if the Wi-Fi is safe',
      'Turn up your screen brightness to check for eavesdroppers'
    ],
    correctIndex: 1,
    explanation: 'Anyone can set up a rogue access point with any name. Using cellular data or an encrypted VPN tunnel prevents local network operators from intercepting unencrypted queries and metadata.',
    category: 'Network Security'
  },
  {
    id: 'quiz-5',
    question: 'A friend on social media suddenly sends you a private message: "Hey! Look at this crazy video of you: bit.ly/3x8... Is this really you???" What is likely happening?',
    context: 'Threat Vector: Account Compromise & Automated Worm Distribution',
    options: [
      'Your friend found a funny video and wants to share it',
      'Your friend\'s account was likely compromised and is sending automated phishing/malware bait',
      'Your device is broadcasting video without your consent',
      'It is an official social media security notification'
    ],
    correctIndex: 1,
    explanation: 'Compromised social accounts automatically send emotionally charged lures (curiosity, fear, scandal) with shortened links to infected contact lists to spread credential stealers.',
    category: 'Social Engineering'
  },
  {
    id: 'quiz-6',
    question: 'What is the "3-2-1" backup rule commonly recommended by cybersecurity and disaster recovery professionals?',
    context: 'Threat Vector: Ransomware & Hardware Failure Resilience',
    options: [
      'Back up 3 files, every 2 days, for 1 month',
      '3 copies of your data, on 2 different media types, with 1 copy kept offline or offsite',
      'Use 3 passwords, 2 usernames, and 1 security key',
      'Restart your computer 3 times, wait 2 minutes, back up 1 folder'
    ],
    correctIndex: 1,
    explanation: 'The 3-2-1 backup strategy ensures resilience against ransomware, hardware corruption, and physical disasters by guaranteeing an isolated offsite or offline copy exists.',
    category: 'Backup & Recovery'
  },
  {
    id: 'quiz-7',
    question: 'When an app on your smartphone asks for permission to access your contacts and precise location to function as a flashlight or calculator, what should you do?',
    context: 'Threat Vector: Data Harvesting & Unnecessary Permissions',
    options: [
      'Grant access because all apps need location to download updates',
      'Deny the permissions or uninstall the app, as these permissions are unnecessary for flashlight functionality',
      'Grant access only between 9 AM and 5 PM',
      'Turn on airplane mode before granting permissions'
    ],
    correctIndex: 1,
    explanation: 'Flashlight and utility apps have zero legitimate technical need for your address book or location. Demands for excessive permissions typically indicate aggressive data collection or monetization.',
    category: 'Privacy & Mobile'
  },
  {
    id: 'quiz-8',
    question: 'Why should you treat online "Security Questions" (e.g. "What street did you grow up on?", "Favorite high school teacher?") like passwords rather than factual answers?',
    context: 'Threat Vector: OSINT Scraping & Public Records Reconnaissance',
    options: [
      'Because teachers frequently change their names',
      'Because real personal facts can be easily discovered through social media, genealogy sites, or public directories',
      'Because websites encrypt only fake answers',
      'Because real answers take too much memory'
    ],
    correctIndex: 1,
    explanation: 'Adversaries utilize open-source intelligence (OSINT) from Facebook, LinkedIn, and public registries to answer factual personal security questions. Using random passphrases prevents this bypass.',
    category: 'Identity Security'
  },
  {
    id: 'quiz-9',
    question: 'What is "Smishing"?',
    context: 'Threat Vector: Mobile Communication Attacks',
    options: [
      'A software bug in older monitors',
      'Phishing attacks executed specifically via SMS text messages',
      'A technique to speed up Wi-Fi signal propagation',
      'A type of encrypted email protocol'
    ],
    correctIndex: 1,
    explanation: 'Smishing (SMS + Phishing) uses deceptive text messages pretending to be postal couriers, banks, or toll operators with malicious links to steal financial credentials.',
    category: 'Mobile Security'
  },
  {
    id: 'quiz-10',
    question: 'You notice your computer screen has turned black and an alert says your files are encrypted and demands $500 in cryptocurrency within 48 hours. What should you immediately do first?',
    context: 'Threat Vector: Active Ransomware Incident Containment',
    options: [
      'Pay the $500 immediately to ensure quick decryption',
      'Disconnect the computer from all internet and local network connections immediately',
      'Send an angry email to the attacker\'s contact address',
      'Format the drive without checking if backups exist'
    ],
    correctIndex: 1,
    explanation: 'Severing network connections immediately halts the malware from discovering and encrypting mapped network drives, shared company servers, or communicating with its command-and-control server.',
    category: 'Incident Response'
  }
];

/**
 * Built-in Cyber Intelligence Knowledge Base for MirrorAI
 * (Ensures immediate, high-quality, safe responses + Telugu / Telenglish support)
 */
export const MIRROR_AI_KNOWLEDGE = {
  greetings: {
    en: "Hello! I am MirrorAI, your defensive cybersecurity advisor. How can I help you understand digital exposure, evaluate suspicious messages, or harden your accounts today? (You can also ask in Telugu / Telenglish!)",
    te: "నమస్కారం! నేను MirrorAI, మీ డిజిటల్ భద్రతా సలహాదారుని. సైబర్ సెక్యూరిటీ, ఫిషింగ్ గుర్తించడం, పాస్‌వర్డ్స్ లేదా అకౌంట్ భద్రత గురించి నన్ను ఏదైనా అడగవచ్చు."
  },
  guardrailRefusal: "I am designed strictly for cybersecurity awareness, digital risk reduction, and defensive guidance. I cannot generate exploits, malware, brute-force commands, unauthorized scanning scripts, or assist in unauthorized access.",
  secretRefusal: "For your safety, never share real passwords, OTPs, credit card numbers, or private credentials. CyberMirror is an educational platform and will never ask for secret credentials."
};
