// Data structure for detection rules
const detectionRules = [
    {
        name: "EC2 Instance Created with IMDSv1",
        description: "Identifies EC2 instances launched with IMDSv1 set to optional, creating a credential theft risk",
        tactics: [
            { tactic: "Initial Access (TA0001)", technique: "T1078.004 - Cloud Accounts" },
            { tactic: "Credential Access (TA0006)", technique: "T1552.005 - Cloud Instance Metadata API" },
            { tactic: "Privilege Escalation (TA0004)", technique: "T1078.004 - Cloud Accounts" },
            { tactic: "Defense Evasion (TA0005)", technique: "T1078.004 - Cloud Accounts" }
        ],
        dataSource: "AWS EC2",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - EC2 - Instance Created with IMDSv1.kql",
        queryModalId: "aws-imdsv1-kql",
        attackPathRef: {
            text: "Pacu IMDS v1 Attack",
            url: "https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#ec2__metadata_services"
        },
        sampleLogsModalId: "imdsv1-logs"
    },
    {
        name: "EC2 Suspicious Deployment Detected",
        description: "Identifies unusual EC2 instance deployments that may indicate cryptomining or other malicious activities",
        tactics: [
            { tactic: "Defense Evasion (TA0005)", technique: "T1578.002 - Modify Cloud Compute Infrastructure: Create Cloud Instance" },
            { tactic: "Execution (TA0002)", technique: "T1204.003 - User Execution: Malicious Image" }
        ],
        dataSource: "AWS EC2",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - EC2 - Suspicious Deployment Detected.kql",
        queryModalId: "ec2-suspicious-deployment-kql",
        attackPathRef: {
            text: "stratus-red-team: Launch Unusual EC2 instances",
            url: "https://stratus-red-team.cloud/attack-techniques/AWS/aws.execution.ec2-launch-unusual-instances/"
        },
        sampleLogsModalId: "ec2-suspicious-deployment-logs"
    },
    {
        name: "EC2 Password Data Retrieved",
        description: "Detects when the Windows password data is retrieved from EC2 instances, potentially indicating credential theft",
        tactics: [
            { tactic: "Credential Access (TA0006)", technique: "T1555.006 - Credentials from Password Stores: Cloud Secrets Management Stores" }
        ],
        dataSource: "AWS EC2",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - EC2 - Password Data Retrieved.kql",
        queryModalId: "ec2-password-kql",
        attackPathRef: {
            text: "stratus-red-team: Retrieve EC2 Password Data",
            url: "https://stratus-red-team.cloud/attack-techniques/AWS/aws.credential-access.ec2-get-password-data/"
        },
        sampleLogsModalId: "ec2-password-logs"
    },
    {
        name: "AMI/EBS/RDS Snapshot Exfiltration Detected",
        description: "Identifies when EBS snapshots, AMIs, or RDS snapshots are shared with unauthorized AWS accounts, potentially indicating data exfiltration",
        tactics: [
            { tactic: "Exfiltration (TA0010)", technique: "T1537.001 - Transfer Data to Cloud Account: Cloud Storage Object" },
            { tactic: "Collection (TA0009)", technique: "T1530 - Data from Cloud Storage" },
            { tactic: "Defense Evasion (TA0005)", technique: "T1578.002 - Modify Cloud Compute Infrastructure: Create Snapshot" },
            { tactic: "Initial Access/Persistence (TA0001/TA0003)", technique: "T1078.004 - Cloud Accounts" }
        ],
        dataSource: "AWS EBS",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - EC2 - Snapshot Exfiltration Detected.kql",
        queryModalId: "snapshot-exfil-kql",
        attackPathRef: {
            text: "stratus-red-team: Exfiltration",
            url: "https://stratus-red-team.cloud/attack-techniques/AWS/"
        },
        sampleLogsModalId: "snapshot-exfil-logs"
    },
    {
        name: "S3 Bucket has been created/accessed/deleted",
        description: "Identifies unusual S3 bucket operations that could indicate unauthorized access or data exfiltration attempts",
        tactics: [
            { tactic: "Collection (TA0009)", technique: "T1530 - Data from Cloud Storage" },
            { tactic: "Execution (TA0002)", technique: "T1537 - Transfer Data to Cloud Account" }
        ],
        dataSource: "AWS S3",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - S3 - Bucket modification detected.kql",
        queryModalId: "s3-modification-kql",
        attackPathRef: {
            text: "stratus-red-team: Launch Unusual EC2 instances",
            url: "https://stratus-red-team.cloud/attack-techniques/AWS/aws.execution.ec2-launch-unusual-instances/"
        },
        sampleLogsModalId: "s3-modification-logs"
    },
    {
        name: "S3 Bucket accessed from an untrusted network",
        description: "Identifies S3 bucket operations from untrusted IP addresses that could indicate unauthorized access or exfiltration",
        tactics: [
            { tactic: "Exfiltration (TA0010)", technique: "T1619 - Cloud Storage Object Discovery" },
            { tactic: "Collection (TA0009)", technique: "T1530 - Data from Cloud Storage" },
            { tactic: "Impact (TA0040)", technique: "T1485 - Data Destruction" },
            { tactic: "Exfiltration (TA0010)", technique: "T1537 - Transfer Data to Cloud Account" }
        ],
        dataSource: "AWS S3",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - S3 - Buckets accessed from untrusted network.kql",
        queryModalId: "s3-untrusted-access-kql",
        attackPathRef: {
            text: "intigriti: Hacking misconfigured AWS S3 buckets: A complete guide",
            url: "https://www.intigriti.com/researchers/blog/hacking-tools/hacking-misconfigured-aws-s3-buckets-a-complete-guide"
        },
        sampleLogsModalId: "snapshot-exfil-logs"
    },
    {
        name: "IAM - Access keys created and deleted within short time frame",
        description: "Detects when IAM access keys are created and quickly deleted, suggesting possible credential theft or attacker covering tracks",
        tactics: [
            { tactic: "Persistence, Privilege Escalation (TA0003, TA0004)", technique: "T1098.001 - Account Manipulation: Additional Cloud Credentials" }
        ],
        dataSource: "AWS IAM",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - IAM - Access keys created and deleted within short time frame.kql",
        queryModalId: "iam-keys-created-deleted-kql",
        attackPathRef: {
            text: "Account Manipulation: Additional Cloud Credentials",
            url: "https://attack.mitre.org/techniques/T1098/001/"
        },
        sampleLogsModalId: "iam-keys-created-deleted-logs"
    },
    {
        name: "IAM - Cloud User Account Creation",
        description: "Detects the creation of new IAM users, which could indicate persistence establishment in the environment",
        tactics: [
            { tactic: "Persistence (TA0003)", technique: "T1136.003 - Create Account: Cloud Account" },
            { tactic: "Discovery (TA0007)", technique: "T1069.003 - Permission Groups Discovery: Cloud Groups" }
        ],
        dataSource: "AWS IAM",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - IAM - Cloud User Account Creation.kql",
        queryModalId: "iam-user-creation-kql",
        attackPathRef: {
            text: "Create Account: Cloud Account",
            url: "https://attack.mitre.org/techniques/T1136/003/"
        },
        sampleLogsModalId: "iam-user-creation-logs"
    },
    {
        name: "IAM - Management Console successful login with no MFA",
        description: "Detects when users log in to the AWS Management Console without multi-factor authentication",
        tactics: [
            { tactic: "Credential Access, Defense Evasion, Persistence (TA0006, TA0005, TA0003)", technique: "T1556.006 - Modify Authentication Process: Multi-Factor Authentication" }
        ],
        dataSource: "AWS IAM",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - IAM - Console login without MFA.kql",
        queryModalId: "iam-login-no-mfa-kql",
        attackPathRef: {
            text: "Modify Authentication Process: Multi-Factor Authentication",
            url: "https://attack.mitre.org/techniques/T1556/006/"
        },
        sampleLogsModalId: "aws-console-login-sessions"
    },
    {
        name: "Network - Connection to malicious IPs and Domains",
        description: "Identifies AWS resources communicating with known malicious IP addresses or domains",
        tactics: [
            { tactic: "Discovery (TA0007)", technique: "T1526 - Cloud Service Discovery" },
            { tactic: "Lateral Movement (TA0008)", technique: "T1021.007 - Remote Services: Cloud Services" },
            { tactic: "Exfiltration (TA0010)", technique: "T1048 - Exfiltration Over Alternative Protocol" }
        ],
        dataSource: "AWS VPC Flow Logs",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Network - Connection to malicious IPs and Domains.kql",
        queryModalId: "network-malicious-ips-kql",
        attackPathRef: {
            text: "Exfiltration Over Alternative Protocol",
            url: "https://attack.mitre.org/techniques/T1048/"
        },
        sampleLogsModalId: "aws-malicious-ip-activity"
    },
    {
        name: "Network - Suspicious Changes to AWS Network Resources",
        description: "Detects unexpected modifications to VPC, security groups, or network ACLs that could indicate network-based attacks",
        tactics: [
            { tactic: "Initial Access (TA0001)", technique: "T1659 - Content Injection" },
            { tactic: "Initial Access (TA0001)", technique: "T1190 - Exploit Public-Facing Application" },
            { tactic: "Initial Access (TA0001)", technique: "T1133 - External Remote Services" }
        ],
        dataSource: "AWS CloudTrail",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Network - Suspicious Changes to AWS Network Resources.kql",
        queryModalId: "network-suspicious-changes-kql",
        attackPathRef: {
            text: "Exploit Public-Facing Application",
            url: "https://attack.mitre.org/techniques/T1190/"
        },
        sampleLogsModalId: "aws-network-security-changes"
    },
    {
        name: "Operations - Changes to AWS Configurations",
        description: "Identifies potentially high-risk changes to AWS account configurations and security settings",
        tactics: [
            { tactic: "Defense Evasion (TA0005)", technique: "T1578.005 - Modify Cloud Compute Infrastructure: Modify Cloud Compute Configurations" }
        ],
        dataSource: "AWS CloudTrail",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Operations - Changes to AWS Configurations.kql",
        queryModalId: "operations-config-changes-kql",
        attackPathRef: {
            text: "Modify Cloud Compute Infrastructure: Modify Cloud Compute Configurations",
            url: "https://attack.mitre.org/techniques/T1578/005/"
        },
        sampleLogsModalId: "aws-config-changes"
    },
    {
        name: "Security - CloudTrail tamper detection",
        description: "Detects attempts to disable, delete, or modify CloudTrail logs to evade detection",
        tactics: [
            { tactic: "Defense Evasion (TA0005)", technique: "T1562.008 - Impair Defenses: Disable or Modify Cloud Logs" }
        ],
        dataSource: "AWS CloudTrail",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Security - CloudTrail tamper detection.kql",
        queryModalId: "security-cloudtrail-tamper-kql",
        attackPathRef: {
            text: "Impair Defenses: Disable or Modify Cloud Logs",
            url: "https://attack.mitre.org/techniques/T1562/008/"
        },
        sampleLogsModalId: "aws-cloudtrail-changes"
    },
    {
        name: "Security - Enhanced GuardDuty",
        description: "Augments Amazon GuardDuty findings with additional context and severity adjustments",
        tactics: [
            { tactic: "Discovery (TA0007)", technique: "T1526 - Cloud Service Discovery" }
        ],
        dataSource: "AWS GuardDuty",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Security - Enhanced GuardDuty.kql",
        queryModalId: "security-enhanced-guardduty-kql",
        attackPathRef: {
            text: "Cloud Service Discovery",
            url: "https://attack.mitre.org/techniques/T1526/"
        },
        sampleLogsModalId: "aws-guardduty-alerts"
    },
    {
        name: "Security - Unauthorized API Calls",
        description: "Detects unauthorized or suspicious API calls that could indicate compromised credentials or insider threats",
        tactics: [
            { tactic: "Execution (TA0002)", technique: "T1059.009 - Command and Scripting Interpreter: Cloud API" }
        ],
        dataSource: "AWS CloudTrail",
        queryPath: "Amazon Web Services/ATT4CKQL - AWS - Security - Unauthorized API Calls.kql",
        queryModalId: "security-unauthorized-api-kql",
        attackPathRef: {
            text: "Command and Scripting Interpreter: Cloud API",
            url: "https://attack.mitre.org/techniques/T1059/009/"
        },
        sampleLogsModalId: "aws-access-denied-errors"
    }
];

// Function to generate table
function generateTable() {
    const tableBody = document.getElementById('detection-rules-table-body');
    tableBody.innerHTML = ''; // Clear the loading indicator
    
    detectionRules.forEach(rule => {
        const tacticsCount = rule.tactics.length;
        
        // Create first row with rowspan for the rule
        const firstRow = document.createElement('tr');
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.setAttribute('rowspan', tacticsCount);
        nameCell.style.fontWeight = 'bold';
        nameCell.textContent = rule.name;
        firstRow.appendChild(nameCell);
        
        // Description cell
        const descCell = document.createElement('td');
        descCell.setAttribute('rowspan', tacticsCount);
        descCell.textContent = rule.description;
        firstRow.appendChild(descCell);
        
        // First tactic cell
        const firstTacticCell = document.createElement('td');
        firstTacticCell.innerHTML = `<strong>${rule.tactics[0].tactic}</strong><br>${rule.tactics[0].technique}`;
        firstRow.appendChild(firstTacticCell);
        
        // Data source cell
        const dataSourceCell = document.createElement('td');
        dataSourceCell.setAttribute('rowspan', tacticsCount);
        dataSourceCell.textContent = rule.dataSource;
        firstRow.appendChild(dataSourceCell);
        
        // Query link cell
        const queryCell = document.createElement('td');
        queryCell.setAttribute('rowspan', tacticsCount);
        queryCell.innerHTML = `<button class="view-logs-btn" onclick="openQueryModal('${rule.queryModalId}', '${rule.queryPath}')">View Query</button>`;
        firstRow.appendChild(queryCell);
        
        // Attack path reference cell
        const refCell = document.createElement('td');
        refCell.setAttribute('rowspan', tacticsCount);
        refCell.innerHTML = `<a href="${rule.attackPathRef.url}" target="_blank">${rule.attackPathRef.text}</a>`;
        firstRow.appendChild(refCell);
        
        // Sample logs cell
        const logsCell = document.createElement('td');
        logsCell.setAttribute('rowspan', tacticsCount);
        logsCell.innerHTML = `<button class="view-logs-btn" onclick="openExternalModal('${rule.sampleLogsModalId}', 'logs')">View Sample Logs</button>`;
        firstRow.appendChild(logsCell);
        
        tableBody.appendChild(firstRow);
        
        // Create additional rows for the remaining tactics
        for (let i = 1; i < tacticsCount; i++) {
            const tacticRow = document.createElement('tr');
            
            const tacticCell = document.createElement('td');
            tacticCell.innerHTML = `<strong>${rule.tactics[i].tactic}</strong><br>${rule.tactics[i].technique}`;
            tacticRow.appendChild(tacticCell);
            
            tableBody.appendChild(tacticRow);
        }
    });
}

// Initialize the table when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Generate the table
    generateTable();
});