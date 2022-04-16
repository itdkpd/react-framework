Write-Host "Checking https certificate"

$password = "123456789"
$securePassword = ConvertTo-SecureString -String $password -Force -AsPlainText

$pfxPath = "./Certificate.pfx"
$outPath = "./node_modules/webpack-dev-server/ssl/server.pem"

Import-PfxCertificate -Password $securePassword -FilePath $pfxPath -CertStoreLocation Cert:\LocalMachine\Root | Out-Null

$keyPath = "./powershell/domain-certificate-key.pem"
$certPath = "./powershell/domain-certificate.pem"

openssl pkcs12 -in $pfxPath -nocerts -out $keyPath -nodes -passin pass:$password
openssl pkcs12 -in $pfxPath -nokeys -out $certPath -nodes -passin pass:$password

$key = Get-Content ./powershell/domain-certificate-key.pem
$cert = Get-Content ./powershell/domain-certificate.pem
$key + $cert | Out-File $outPath -Encoding ASCII

Write-Host "Https certificate written to $outPath"