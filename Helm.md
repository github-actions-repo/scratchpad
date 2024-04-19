## Installing Helm

[Ref.](https://cert-manager.io/docs/installation/helm/#installing-with-helm)
```
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.14.4 --set installCRDs=true
```

## Deploying ARC on Minikube

```
helm repo add actions-runner-controller https://actions-runner-controller.github.io/actions-runner-controller
helm repo update
helm upgrade --install --namespace actions-runner-system --create-namespace --set=authSecret.create=true\
  --set=authSecret.github_token="YOUR_PAT_TOKEN_HERE"\
  --wait actions-runner-controller actions-runner-controller/actions-runner-controller
```

runner.yaml
```
apiVersion: actions.summerwind.dev/v1alpha1
kind: RunnerDeployment
metadata:
  name: org-runnerdeploy
spec:
  replicas: 2
  template:
    spec:
      organization: github-actions-repo
      repository: github-actions-repo/scratchpad
```

```
kubectl apply -f runner.yaml
```