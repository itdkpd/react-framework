if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process PowerShell -Verb RunAs "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
    exit;
}
$certificate = New-SelfSignedCertificate -Type Custom -Subject "E=Sample.gmail.com,CN=REACT" -KeyAlgorithm RSA -KeyLength 2048 -SmimeCapabilities -certstorelocation cert:\localmachine\my -dnsname "localhost", "192.168.1.5"
$password = "123456789"
$securePassword = ConvertTo-SecureString -String $password -Force -AsPlainText

$pfxPath = "../Certificate.pfx"

Export-PfxCertificate -Cert $certificate -FilePath $pfxPath -Password $securePassword | Out-Null