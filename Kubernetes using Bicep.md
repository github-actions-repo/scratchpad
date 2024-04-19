## Setting up Kubernetes using Bicep

1. Access the shell at https://shell.azure.com/ in your web browser of choice. You may be prompted to choose an account should you have more than one. Upon selecting an account, the shell will load it.
   
2. We now need to create some form of key that can be used to represent trust in our environment. By running the following commands, we will create a key to use when we’re creating nodes for our Kubernetes environment in the cloud:
   
   ```
   az sshkey create --name "scratchpad" --resource-group "scratchpad-rg"
   ```

3. Now, we want to run the key generation to create a public/private rsa key for use.
   
   ```
   ssh-keygen -t rsa -b 4096
   ```

4. You'll get a few questions, the first being a name. For this, just put your organization name. The second and third questions will be for a pass phrase; enter one, keep it secret, and remember it so that you can recover your cluster.
   
5. Next, let’s fetch the latest commits from our existing `BuildInfra.Azure` repository and add an `aks.bicep` file under the infra folder there, with the content from the file at https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.kubernetes/aks/main.bicep in it. The file is too big to include it in its entirety in this book, and we won’t go over the parameters and outputs, as we’ve covered them before, but let’s look at what we’re setting up within the `managedClusters` type:
   
   ```
   resource aks 'Microsoft.ContainerService/managedClusters@2022-05-02-preview' = {
    name: clusterName
    location: location
    identity: {
        type: 'SystemAssigned'
    }
   }
   ```

   The preceding code allows the system to manage the assignment of the identity, and the location and cluster name are set by what is passed in. If the default values are used, the `clusterName` param is set as `aks101cluster`. We’re going to override this to `github-build-action` later when we deploy this resource.

6. The following code has a DNS prefix, which we can add to the **fully-qualified domain name (FQDN)** of the hosted Kubernetes API server and profiles of the nodes that it will spin up. They’re going to be a Linux machine and part of the agent pool. By default, our agent pool will be created with three nodes within the pool, each with the default disk size applied to it:
   
   ```
   properties: {
    dnsPrefix: dnsPrefix
    agentPoolProfiles: [
      {
        name: 'agentpool'
        osDiskSizeGB: osDiskSizeGB
        count: agentCount
        vmSize: agentVMSize
        osType: 'Linux'
        mode: 'System'
      }
    ]
   }
   ```

7. The VM image size will be standard_d2s_v3, with 2 vCPUs, 8 GB of memory, and 16 GB of SSD storage. We will now set a username on each machine within the pool that was provisioned and configure each machine with the SSH RSA public key we generated:

8. We pass this data in via parameters which we source the value from the key we generated before; you’ll see it in the shell on the JSON object returned on the first command.
   
9.  We'll need to construct a command to run the bicep file we’ve constructed so far:
    
    ```
    az deployment group create --resource-group myResourceGroup --template-file aks.bicep --parameters clusterName=actionsCluster dnsPrefix=<dns-prefix> linuxAdminUsername=<linux-admin-username> sshRSAPublicKey="<ssh-key>"
    ```

    Amend the values in this command with a username and a DNS prefix of your choice; you will also need to provide the public key we discussed before. Press Enter, and you should see it running. If you received an error, and it’s not a validation error, try doing az logout and az login, and then try again.


To test that this works, we can run the following command

```
az aks get-credentials --resource-group scratchpad-rg --name actionsCluster
```

You'll then get a response, saying that the context was merged into the current one. Now, run the following command to validate that the returned nodes are AKS Pods.

```
kubectl get nodes
kubectl get events
```