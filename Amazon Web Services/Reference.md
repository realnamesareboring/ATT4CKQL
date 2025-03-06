| Rule Name                                             | Service  | MITRE Tatic                                                              | Technique ID     | Sub-Technique ID       | Attack Path Reference  |  
|-------------------------------------------------------|----------|--------------------------------------------------------------------------|------------------|------------------------|------------------------|
| ATT4CKQL - AWS - EBS - Snapshot Exfiltration Detected | EC2      | Initial Access, Credential Access, Privilege Escalation, Defense Evasion | Phishing         |                        |                        | 

| Execution             | PowerShell                         | ✅               | ✅                    | 
| Persistence           | Account Manipulation               | ✅               | ❌                    | 
| Privilege Escalation  | Credential Dumping                 | ✅               | ✅                    | 
| Defense Evasion       | Obfuscated Files or Information    | ✅               | ✅                    | 
| Credential Access     | Brute Force                        | ✅               | ✅                    | 
| Discovery             | Network Service Scanning           | ✅               | ✅                    | 
| Lateral Movement      | Remote Services                    | ✅               | ✅                    | 
| Collection            | Data from Information Repositories | ✅               | ✅                    | 
| Exfiltration          | Exfiltration Over Web Service      | ✅               | ✅                    | 
| Impact                | Data Destruction                   | ✅               | ✅                    | 