# Define the domain controller
$domainController = "DC01.logs4loot.com"

# Import user credentials from CSV
$users = Import-Csv -Path "C:\Users\RSanchez.LOGS4LOOT\Desktop\Scripts\users.csv"

# Loop through each user in the CSV
foreach ($user in $users) {
    $username = $user.Username
    $password = $user.Password

    # Create a credential object
    $securePassword = ConvertTo-SecureString $password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential($username, $securePassword)

    # Loop to attempt authentication 20 times
    for ($i = 1; $i -le 20; $i++) {
        try {
            New-PSDrive -Name "Z" -PSProvider "FileSystem" -Root "\\$domainController\SharedFolder" -Credential $credential -ErrorAction Stop
        } catch {
            Write-Host ("Attempt {0}: Failed to authenticate as {1} against {2}" -f $i, $username, $domainController)
        } finally {
            # Clean up
            Remove-PSDrive -Name "Z" -ErrorAction SilentlyContinue
        }
    }
}
