<table style="border-collapse: collapse; width: 100%; border: 2px solid #666;">
  <thead>
    <tr>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">Detection Name</th>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">Description</th>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">MITRE Tactics & Techniques</th>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">Data Source</th>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">Query Link</th>
      <th style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; text-align: left;">Attack Path Reference</th>
    </tr>
  </thead>
  <tbody>
    <!-- AWS IMDSv1 Vulnerability Detection -->
    <tr>
      <td style="border: 1px solid #666; padding: 8px; font-weight: bold;" rowspan="4">AWS IMDSv1 Vulnerability Detection</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="4">Identifies EC2 instances launched with IMDSv1 set to optional, creating a credential theft risk</td>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Initial Access (TA0001)</strong><br>T1078.004 - Cloud Accounts</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="4">AWS CloudTrail</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="4"><a href="https://github.com/your-repo/aws-rules/imdsv1.md">View Query</a></td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="4"><a href="https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#ec2__metadata_services">Pacu IMDS v1 Attack</a></td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Credential Access (TA0006)</strong><br>T1552.005 - Cloud Instance Metadata API</td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Privilege Escalation (TA0004)</strong><br>T1078.004 - Cloud Accounts</td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Defense Evasion (TA0005)</strong><br>T1078.004 - Cloud Accounts</td>
    </tr>
    <!-- AWS Snapshot Exfiltration Detection -->
    <tr>
      <td style="border: 1px solid #666; padding: 8px; font-weight: bold;" rowspan="3">AWS Snapshot Exfiltration Detection</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="3">Identifies when EBS snapshots are shared with unauthorized AWS accounts</td>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Exfiltration (TA0010)</strong><br>T1537 - Transfer Data to Cloud Account</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="3">AWS CloudTrail</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="3"><a href="https://github.com/your-repo/aws-rules/snapshot-exfil.md">View Query</a></td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="3"><a href="https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#ebs__snapshot_explorer">AWS Snapshot Exfiltration</a></td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Collection (TA0009)</strong><br>T1530 - Data from Cloud Storage</td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Defense Evasion (TA0005)</strong><br>T1578.002 - Create Snapshot</td>
    </tr>
    <!-- AWS CloudTrail Manipulation -->
    <tr>
      <td style="border: 1px solid #666; padding: 8px; font-weight: bold;" rowspan="2">AWS CloudTrail Manipulation</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">Detects attempts to disable or delete CloudTrail logs to hide attacker activity</td>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Defense Evasion (TA0005)</strong><br>T1562.008 - Disable Cloud Logs</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">AWS CloudTrail</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/your-repo/aws-rules/cloudtrail-disable.md">View Query</a></td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/aquasecurity/cloudsploit/blob/master/plugins/aws/cloudtrail/cloudtrailEnabled.js">Cloudsploit DisableCloudTrail</a></td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Impact (TA0040)</strong><br>T1485 - Data Destruction</td>
    </tr>
    <!-- AWS IAM Permission Changes -->
    <tr>
      <td style="border: 1px solid #666; padding: 8px; font-weight: bold;" rowspan="2">AWS IAM Permission Changes</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">Monitors for suspicious changes to IAM policies and roles that could indicate privilege escalation</td>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Persistence (TA0003)</strong><br>T1098.001 - Additional Cloud Credentials</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">AWS CloudTrail</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/your-repo/aws-rules/iam-changes.md">View Query</a></td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/spacesiren/aws-shadow-admin">AWS Shadow Admin Exploitation</a></td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Privilege Escalation (TA0004)</strong><br>T1068 - Exploitation for Privilege Escalation</td>
    </tr>
    <!-- AWS S3 Bucket Public Access -->
    <tr>
      <td style="border: 1px solid #666; padding: 8px; font-weight: bold;" rowspan="2">AWS S3 Bucket Public Access</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">Identifies when S3 bucket permissions are changed to allow public access</td>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Exfiltration (TA0010)</strong><br>T1537 - Transfer Data to Cloud Account</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2">AWS CloudTrail</td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/your-repo/aws-rules/s3-public.md">View Query</a></td>
      <td style="border: 1px solid #666; padding: 8px;" rowspan="2"><a href="https://github.com/sa7mon/S3Scanner">S3 Bucket Scanner</a></td>
    </tr>
    <tr>
      <td style="border: 1px solid #666; padding: 8px;"><strong>Defense Evasion (TA0005)</strong><br>T1578 - Modify Cloud Compute Infrastructure</td>
    </tr>
    <!-- Add more AWS rules following the same pattern -->
  </tbody>
</table>

<table style="border-collapse: collapse; width: 100%; border: 2px solid #666;">
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold; text-align: center;" rowspan="2">Platform</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff; font-weight: bold; text-align: center;" colspan="3">AWS</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd; font-weight: bold; text-align: center;" colspan="3">Azure</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6; font-weight: bold; text-align: center;" colspan="3">GCP</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">AMI Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">RDS Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">Disk Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">Managed Disk Access</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">VM Export</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Disk Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Image Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Persistent Disk Export</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold;">MITRE Tactic</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold;">Detection Query</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS Snapshot Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS AMI Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS RDS Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure Disk Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure SAS Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure Export Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Disk Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Image Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Export Exfil</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold;">Attack Path Reference</td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#ebs__snapshot_explorer">Pacu EBS Explorer</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#ec2__enum_shares">Pacu AMI Sharing</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/RhinoSecurityLabs/pacu/wiki/Module-Details#rds__explore_snapshots">Pacu RDS Explorer</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/NetSPI/MicroBurst">MicroBurst</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/hausec/PowerZure">PowerZure</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/dafthack/MSOLSpray">Azure Attack Tools</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/RhinoSecurityLabs/GCPBucketBrute">GCP Bucket Brute</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/carlospolop/hacktricks-cloud/blob/master/gcp-security">GCP Attack Paths</a></td>
    <td style="border: 1px solid #666; padding: 8px;"><a href="https://github.com/RhinoSecurityLabs/GCP-IAM-Privilege-Escalation">GCP IAM Attacks</a></td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%; border: 2px solid #666;">
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold; text-align: center;" rowspan="2">Platform</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff; font-weight: bold; text-align: center;" colspan="3">AWS</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd; font-weight: bold; text-align: center;" colspan="3">Azure</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6; font-weight: bold; text-align: center;" colspan="3">GCP</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">AMI Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6f2ff;">RDS Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">Disk Snapshot Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">Managed Disk Access</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #e6fffd;">VM Export</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Disk Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Image Sharing</td>
    <td style="border: 1px solid #666; padding: 8px; background-color: #fff2e6;">Persistent Disk Export</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold;">MITRE Tactic</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
    <td style="border: 1px solid #666; padding: 8px;">Exfiltration</td>
  </tr>
  <tr>
    <td style="border: 1px solid #666; padding: 8px; background-color: #f0f0f0; font-weight: bold;">Detection Query</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS Snapshot Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS AMI Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">AWS RDS Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure Disk Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure SAS Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">Azure Export Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Disk Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Image Exfil</td>
    <td style="border: 1px solid #666; padding: 8px;">GCP Export Exfil</td>
  </tr>
</table>