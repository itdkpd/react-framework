Write-Host "Creating https certificate"

if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process PowerShell -Verb RunAs "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
    exit;
}
$certificate = New-SelfSignedCertificate -Type Custom -Subject "C=PH,ST=Some-State,O=REACT,OU=REACT,CN=REACT" -KeyUsage DataEncipherment, KeyEncipherment, DigitalSignature -KeyAlgorithm RSA -KeyLength 2048 -SmimeCapabilities -certstorelocation cert:\localmachine\my -dnsname localhost
$password = "12345678910"
$securePassword = ConvertTo-SecureString -String $password -Force -AsPlainText

$pfxPath = "./Certificate.pfx"
$outPath = "../node_modules/webpack-dev-server/ssl/server.pem"
$outPath1 = "./server.pem"

Export-PfxCertificate -Cert $certificate -FilePath $pfxPath -Password $securePassword | Out-Null
Import-PfxCertificate -Password $securePassword -FilePath $pfxPath -CertStoreLocation Cert:\LocalMachine\Root | Out-Null

$keyPath = "./domains-certificate-key.pem"
$certPath = "./domains-certificate.pem"

openssl pkcs12 -in $pfxPath -nocerts -out $keyPath -nodes -passin pass:$password
openssl pkcs12 -in $pfxPath -nokeys -out $certPath -nodes -passin pass:$password

$key = Get-Content ./domains-certificate-key.pem
$cert = Get-Content ./domains-certificate.pem
# $key + $cert | Out-File $outPath -Encoding ASCII
$key + $cert | Out-File $outPath1 -Encoding ASCII

Write-Host "Https certificate written to $outPath"