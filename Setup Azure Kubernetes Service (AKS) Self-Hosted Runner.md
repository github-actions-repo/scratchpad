## Setting Up Self-Hosted Runners

This can be installed using Chocolatey (a package manager for Windows) easily with the following command:

Windows
```
choco install kubernetes-Helm
```

Linux
```
curl -fsSL -o get_Helm.sh https://raw.githubusercontent.com/Helm/Helm/main/scripts/get-Helm-3
chmod 700 get_Helm.sh
./get_Helm.sh
```

**Self-Hosted (Windows)**

```
# Create a folder under the drive root
mkdir actions-runner; cd actions-runner

# Download the latest runner package
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.315.0/actions-runner-win-x64-2.315.0.zip -OutFile actions-runner-win-x64-2.315.0.zip

# Optional: Validate the hash
if((Get-FileHash -Path actions-runner-win-x64-2.315.0.zip -Algorithm SHA256).Hash.ToUpper() -ne '7bb01772ec66a72f733bcae6a641d3f2c6551d8b298bdd022e4b35ab59773b5a'.ToUpper()){ throw 'Computed checksum did not match' }

# Extract the installer
Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/actions-runner-win-x64-2.315.0.zip", "$PWD")

# Create the runner and start the configuration experience
$ ./config.cmd --url https://github.com/github-actions-repo --token XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Run it!
$ ./run.cmd
```

**Self-Hosted (Linux)**

```
# Create a folder
mkdir actions-runner && cd actions-runner

# Download the latest runner package
curl -o actions-runner-linux-x64-2.315.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.315.0/actions-runner-linux-x64-2.315.0.tar.gz

# Optional: Validate the hash
echo "6362646b67613c6981db76f4d25e68e463a9af2cc8d16e31bfeabe39153606a0  actions-runner-linux-x64-2.315.0.tar.gz" | shasum -a 256 -c

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.315.0.tar.gz

# Create the runner and start the configuration experience
./config.sh --url https://github.com/github-actions-repo --token XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Last step, run it!
./run.sh
```