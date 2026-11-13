// Tools, DevOps and cloud courses.
// Lesson rows: [module, title, explanation, code]   Quiz rows: [question, options, answerIndex, why]

export default [
  {
    id: 'git',
    title: 'Git & GitHub',
    category: 'devops',
    level: 'Beginner',
    icon: 'Git',
    color: '#f05032',
    lang: 'bash',
    hours: 5,
    tagline: 'Track every change and collaborate like a professional.',
    description:
      'Git is the version-control system every developer uses. Learn commits, the staging area, branching and merging, resolving conflicts, working with GitHub remotes, and the pull-request workflow.',
    outcomes: ['Commit and inspect history', 'Branch, merge and resolve conflicts', 'Push and pull with GitHub', 'Collaborate through pull requests'],
    lessons: [
      ['Basics', 'Repositories and commits', 'A repository tracks your project\'s history. Changes move from the working directory to the staging area (`git add`) and then into a commit (`git commit`), a snapshot with a message. `git status` and `git log` show where you are.', `git config --global user.name "Your Name"
git config --global user.email "you@example.com"

git init
git status
git add index.html style.css     # stage specific files
git add .                        # or everything
git commit -m "Add landing page"
git log --oneline --graph`],
      ['Basics', 'Undoing and inspecting changes', '`git diff` shows unstaged changes and `git diff --staged` shows what will be committed. `git restore` discards working changes, `git restore --staged` unstages, and `git revert` safely creates a new commit that undoes an old one.', `git diff                     # what changed but isn't staged
git diff --staged            # what will go in the next commit
git restore app.js           # discard local edits to a file
git restore --staged app.js  # unstage, keep the edits
git commit --amend -m "Better message"   # fix the last (unpushed) commit
git revert a1b2c3d           # undo a pushed commit safely
echo "node_modules/" >> .gitignore`],
      ['Branching', 'Branches and merging', 'A branch is a movable pointer to a line of work, so you can build features without touching `main`. Create and switch with `git switch -c`, then merge back. Git fast-forwards when it can or creates a merge commit.', `git switch -c feature/quiz      # create and switch
# ...edit, add, commit...
git switch main
git merge feature/quiz
git branch -d feature/quiz      # delete merged branch

git branch                      # list branches
git log --oneline --all --graph`],
      ['Branching', 'Resolving merge conflicts', 'A conflict happens when two branches change the same lines. Git marks the file with `<<<<<<<`, `=======` and `>>>>>>>`. Edit it to the final version, remove the markers, then `git add` and commit.', `git merge feature/navbar
# CONFLICT (content): Merge conflict in index.html

# index.html now contains:
# <<<<<<< HEAD
# <h1>CodeVidya</h1>
# =======
# <h1>CodeVidya Academy</h1>
# >>>>>>> feature/navbar

# edit to the version you want, delete the markers, then:
git add index.html
git commit -m "Merge feature/navbar"`],
      ['Collaboration', 'GitHub and pull requests', 'A remote is a copy of the repo hosted elsewhere, usually on GitHub. `push` uploads commits, `pull` fetches and merges others\' work. Teams open pull requests from feature branches so code is reviewed before it reaches `main`.', `git remote add origin https://github.com/you/codevidya.git
git push -u origin main

git switch -c fix/typo
git commit -am "Fix typo on home page"
git push -u origin fix/typo
# -> open a Pull Request on GitHub, get review, merge

git switch main
git pull                     # get the merged changes
git clone https://github.com/you/codevidya.git   # copy a repo`],
    ],
    quiz: [
      ['Which command stages changes?', ['git commit', 'git add', 'git push', 'git stage-all'], 1, 'git add moves changes into the staging area.'],
      ['How do you create and switch to a new branch?', ['git branch -m', 'git switch -c name', 'git merge name', 'git new name'], 1, 'switch -c creates and checks out the branch.'],
      ['What is the safe way to undo a commit that is already pushed?', ['git reset --hard', 'git revert', 'Delete the repo', 'git amend'], 1, 'revert adds a new commit and keeps history intact.'],
      ['What does git pull do?', ['Uploads commits', 'Fetches and merges remote changes', 'Deletes branches', 'Creates a PR'], 1, 'pull = fetch + merge (or rebase).'],
    ],
  },
  {
    id: 'linux',
    title: 'Linux & Bash Scripting',
    category: 'devops',
    level: 'Beginner',
    icon: 'Sh',
    color: '#333333',
    lang: 'bash',
    hours: 7,
    tagline: 'Master the command line that runs the world\'s servers.',
    description:
      'Almost every server runs Linux. Learn to navigate the file system, manipulate files, understand permissions, chain commands with pipes, manage processes, and automate tasks with Bash scripts.',
    outcomes: ['Navigate and manage files from the terminal', 'Understand users and permissions', 'Combine tools with pipes and redirection', 'Write Bash scripts with variables and loops'],
    lessons: [
      ['Basics', 'Navigating the file system', 'Everything starts at the root `/`. `pwd` prints where you are, `ls` lists files, `cd` changes directory. `~` is your home folder, `.` is the current folder and `..` is the parent.', `pwd                 # /home/asha
ls -la              # long listing, including hidden files
cd /var/log
cd ~                # home
cd ..               # up one level

mkdir -p projects/codevidya/src
touch projects/codevidya/README.md
cp README.md backup.md
mv backup.md old/
rm -r old/          # careful: no recycle bin!`],
      ['Basics', 'Viewing and searching files', '`cat` prints files, `less` pages through them, and `head` / `tail` show the start or end (`tail -f` follows a live log). `grep` searches text and `find` searches for files.', `cat notes.txt
less /var/log/syslog          # q to quit, / to search
head -n 5 data.csv
tail -f /var/log/nginx/access.log

grep -n "error" app.log       # show line numbers
grep -ri "todo" src/          # recursive, case-insensitive
find . -name "*.js" -size +100k
wc -l *.py                    # count lines`],
      ['System', 'Permissions and users', 'Each file has an owner, a group and permissions for read (r=4), write (w=2) and execute (x=1) for the user, group and others. Change them with `chmod` and ownership with `chown`. `sudo` runs a command as the superuser.', `ls -l deploy.sh
# -rw-r--r-- 1 asha devs 512 Oct 5 deploy.sh
#  user=rw  group=r  others=r

chmod +x deploy.sh         # make executable
chmod 750 deploy.sh        # rwx r-x ---
sudo chown www-data:www-data /var/www -R

whoami
sudo apt update && sudo apt install -y git`],
      ['System', 'Pipes, redirection and processes', 'A pipe `|` sends one command\'s output into the next, so small tools combine into powerful ones. `>` writes output to a file, `>>` appends, and `2>` captures errors. `ps`, `top`, `kill` and `&` manage processes.', `# Top 5 most frequent IPs in an access log
cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -5

ls -l > listing.txt         # overwrite
echo "done" >> log.txt      # append
npm run build 2> errors.txt # errors only

ps aux | grep node
top                         # live view (q to quit)
kill 4821                   # stop process by PID
python server.py &          # run in background`],
      ['Automation', 'Bash scripting', 'A script is a file of commands starting with a shebang `#!/usr/bin/env bash`. Use variables, `$1` for arguments, `if` tests and `for` loops. `set -euo pipefail` makes scripts stop on errors instead of silently continuing.', `#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="\${1:-./backups}"
STAMP=$(date +%Y-%m-%d_%H%M)

mkdir -p "$BACKUP_DIR"

for dir in src docs; do
  if [ -d "$dir" ]; then
    tar -czf "$BACKUP_DIR/\${dir}_$STAMP.tar.gz" "$dir"
    echo "Backed up $dir"
  else
    echo "Skipping $dir (not found)" >&2
  fi
done

echo "Backups: $(ls "$BACKUP_DIR" | wc -l) files"
# chmod +x backup.sh && ./backup.sh /mnt/drive`],
    ],
    quiz: [
      ['Which command shows your current directory?', ['ls', 'pwd', 'cd', 'whereami'], 1, 'pwd = print working directory.'],
      ['What does chmod 755 grant the owner?', ['Read only', 'Read and write', 'Read, write and execute', 'Nothing'], 2, '7 = 4 + 2 + 1 = rwx.'],
      ['What does the | operator do?', ['Runs commands in parallel', 'Sends output of one command as input to the next', 'Writes to a file', 'Comments out code'], 1, 'Pipes chain commands together.'],
      ['Inside a Bash script, $1 refers to…', ['The script name', 'The first argument', 'The exit code', 'The process id'], 1, '$0 is the script name, $1 the first argument.'],
    ],
  },
  {
    id: 'docker',
    title: 'Docker & Containers',
    category: 'devops',
    level: 'Intermediate',
    icon: 'Dk',
    color: '#2496ed',
    lang: 'dockerfile',
    hours: 7,
    tagline: 'Package apps so they run the same everywhere.',
    description:
      'Containers bundle an app with everything it needs. Learn images vs containers, writing Dockerfiles, layers and caching, volumes and networking, and running multi-service apps with Docker Compose.',
    outcomes: ['Run and manage containers', 'Write efficient Dockerfiles', 'Persist data with volumes', 'Orchestrate services with Compose'],
    lessons: [
      ['Basics', 'Images and containers', 'An image is a read-only template; a container is a running instance of it. Pull images from Docker Hub, map ports with `-p host:container`, and run in the background with `-d`.', `docker run hello-world
docker run -d --name web -p 8080:80 nginx   # open http://localhost:8080

docker ps                 # running containers
docker ps -a              # all containers
docker logs -f web
docker exec -it web sh    # shell inside the container
docker stop web && docker rm web
docker images`],
      ['Images', 'Writing a Dockerfile', 'A Dockerfile is a recipe for an image. Each instruction creates a layer. Copy dependency manifests before source code so `npm install` stays cached when only your code changes.', `# Dockerfile for a Node.js API
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]

# docker build -t codevidya-api .
# docker run -p 3000:3000 codevidya-api`],
      ['Images', 'Multi-stage builds and .dockerignore', 'Multi-stage builds compile in one stage and copy only the output into a small final image, which makes images smaller and safer. A `.dockerignore` keeps `node_modules`, `.git` and secrets out of the build context.', `# Build a React app, serve it with nginx
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# .dockerignore
# node_modules
# .git
# .env`],
      ['Data', 'Volumes and networks', 'Container filesystems are temporary. Named volumes persist data such as databases beyond a container\'s life; bind mounts map a host folder for live development. Containers on the same user-defined network reach each other by name.', `docker volume create pgdata
docker network create school-net

docker run -d --name db --network school-net \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data postgres:17

docker run -d --name api --network school-net \\
  -e DATABASE_URL=postgres://postgres:secret@db:5432/postgres \\
  -p 3000:3000 codevidya-api

# dev: live-reload your source with a bind mount
docker run -v "$(pwd)":/app -p 5173:5173 node:22 sh -c "cd /app && npm run dev"`],
      ['Compose', 'Docker Compose', 'Compose defines a whole multi-container app in one `compose.yaml`: services, ports, environment, volumes and dependencies. `docker compose up` starts everything and `down` tears it down.', `# compose.yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/school
    depends_on: [db]
  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: school
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:

# docker compose up -d --build
# docker compose logs -f api
# docker compose down`],
    ],
    quiz: [
      ['A running instance of an image is a…', ['Volume', 'Container', 'Layer', 'Registry'], 1, 'Images are templates; containers run them.'],
      ['Why copy package.json before the rest of the code?', ['It is required', 'To reuse the cached dependency layer', 'To shrink the image', 'For security'], 1, 'Dependencies are reinstalled only when the manifest changes.'],
      ['How do you persist database data across container restarts?', ['EXPOSE', 'A volume', 'ENV', 'docker ps'], 1, 'Volumes outlive containers.'],
      ['Which file defines a multi-container app?', ['Dockerfile', 'compose.yaml', '.dockerignore', 'package.json'], 1, 'Compose describes services together.'],
    ],
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes Essentials',
    category: 'devops',
    level: 'Advanced',
    icon: 'K8s',
    color: '#326ce5',
    lang: 'yaml',
    hours: 9,
    tagline: 'Run and scale containers in production.',
    description:
      'Kubernetes orchestrates containers across a cluster: it schedules, heals and scales them. Learn pods, deployments, services, configuration with ConfigMaps and Secrets, and rolling updates with kubectl.',
    outcomes: ['Explain cluster architecture', 'Deploy apps with Deployments', 'Expose apps with Services and Ingress', 'Configure, scale and update workloads'],
    lessons: [
      ['Concepts', 'Clusters, nodes and pods', 'A cluster has a control plane that decides what runs where and worker nodes that run workloads. The smallest unit is a pod: one or more containers sharing a network and storage. You declare the desired state in YAML and Kubernetes makes it so.', `# Local cluster: minikube start  (or kind create cluster)
kubectl get nodes
kubectl get pods -A

# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  containers:
    - name: web
      image: nginx:alpine
      ports:
        - containerPort: 80

# kubectl apply -f pod.yaml && kubectl describe pod hello`],
      ['Workloads', 'Deployments', 'You rarely create pods directly. A Deployment keeps a set number of replica pods running, replaces crashed ones, and performs rolling updates when you change the image.', `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      containers:
        - name: api
          image: codevidya/api:1.0
          ports: [{ containerPort: 3000 }]
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits: { cpu: 500m, memory: 256Mi }`],
      ['Networking', 'Services and Ingress', 'Pods come and go and change IPs. A Service gives a stable name and load-balances across matching pods. An Ingress routes external HTTP traffic by host and path to services.', `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector: { app: api }
  ports: [{ port: 80, targetPort: 3000 }]
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: codevidya
spec:
  rules:
    - host: codevidya.local
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service: { name: api, port: { number: 80 } }`],
      ['Config', 'ConfigMaps and Secrets', 'Keep configuration out of images. ConfigMaps hold plain settings and Secrets hold sensitive values; both can be injected as environment variables or mounted files. Liveness and readiness probes tell Kubernetes when to restart or route traffic.', `apiVersion: v1
kind: ConfigMap
metadata: { name: api-config }
data:
  LOG_LEVEL: info
---
# kubectl create secret generic api-secret --from-literal=JWT_SECRET=s3cr3t

# inside the Deployment's container spec:
envFrom:
  - configMapRef: { name: api-config }
  - secretRef: { name: api-secret }
readinessProbe:
  httpGet: { path: /health, port: 3000 }
livenessProbe:
  httpGet: { path: /health, port: 3000 }
  initialDelaySeconds: 10`],
      ['Operations', 'Scaling and rolling updates', 'Scale manually with `kubectl scale` or automatically with a HorizontalPodAutoscaler based on CPU. Changing the image triggers a rolling update with zero downtime, and `rollout undo` reverts a bad release.', `kubectl scale deployment api --replicas=5
kubectl autoscale deployment api --cpu-percent=70 --min=2 --max=10

kubectl set image deployment/api api=codevidya/api:1.1
kubectl rollout status deployment/api
kubectl rollout history deployment/api
kubectl rollout undo deployment/api        # roll back

kubectl logs -l app=api --tail=50
kubectl top pods`],
    ],
    quiz: [
      ['The smallest deployable unit in Kubernetes is a…', ['Node', 'Pod', 'Container image', 'Service'], 1, 'A pod wraps one or more containers.'],
      ['What keeps a fixed number of pod replicas running?', ['Service', 'Deployment', 'ConfigMap', 'Ingress'], 1, 'Deployments manage ReplicaSets.'],
      ['Why use a Service?', ['To build images', 'To give pods a stable address and load-balance', 'To store secrets', 'To run cron jobs'], 1, 'Pod IPs change; Services do not.'],
      ['How do you roll back a bad deployment?', ['kubectl delete', 'kubectl rollout undo', 'docker rm', 'kubectl scale 0'], 1, 'Kubernetes keeps rollout history.'],
    ],
  },
  {
    id: 'aws',
    title: 'AWS Cloud Fundamentals',
    category: 'devops',
    level: 'Intermediate',
    icon: 'AWS',
    color: '#ff9900',
    lang: 'bash',
    hours: 8,
    tagline: 'Core cloud services: compute, storage, databases and serverless.',
    description:
      'Amazon Web Services is the largest cloud platform. Learn regions and IAM, EC2 virtual machines, S3 storage, managed databases with RDS, serverless Lambda functions, and cost-conscious architecture.',
    outcomes: ['Secure accounts with IAM', 'Launch EC2 instances', 'Store and serve files with S3', 'Build serverless functions with Lambda'],
    lessons: [
      ['Foundations', 'Regions, IAM and the CLI', 'AWS runs in regions (such as ap-south-1, Mumbai), each with several availability zones. IAM controls who can do what: never use the root account daily; create users or roles with least-privilege policies. The AWS CLI scripts everything.', `aws configure            # access key, secret, region (ap-south-1), output json
aws sts get-caller-identity

# Least-privilege policy: read-only access to one bucket
cat > policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": ["arn:aws:s3:::codevidya-assets", "arn:aws:s3:::codevidya-assets/*"]
  }]
}
EOF
aws iam create-policy --policy-name AssetsReadOnly --policy-document file://policy.json`],
      ['Compute', 'EC2 virtual servers', 'EC2 rents virtual machines by the second. Pick an AMI (operating system image), an instance type (CPU/RAM), a key pair for SSH and a security group (firewall). Stop instances you are not using; you pay while they run.', `aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.micro \\
  --key-name my-key \\
  --security-group-ids sg-0123456789abcdef0 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=codevidya-web}]'

aws ec2 describe-instances --filters "Name=tag:Name,Values=codevidya-web"
ssh -i my-key.pem ec2-user@<public-ip>
aws ec2 stop-instances --instance-ids i-0123456789abcdef0`],
      ['Storage', 'S3 object storage', 'S3 stores any amount of files ("objects") in buckets with 11 nines of durability. Buckets are private by default. Use it for backups, uploads and static websites, and share private files with time-limited presigned URLs.', `aws s3 mb s3://codevidya-assets-2026
aws s3 cp logo.png s3://codevidya-assets-2026/images/
aws s3 sync ./dist s3://codevidya-site --delete   # deploy a static site
aws s3 ls s3://codevidya-assets-2026 --recursive

# Temporary download link valid for 1 hour
aws s3 presign s3://codevidya-assets-2026/certs/asha.pdf --expires-in 3600`],
      ['Databases', 'RDS and DynamoDB', 'RDS runs managed PostgreSQL or MySQL with backups, patching and failover handled for you. DynamoDB is a serverless NoSQL key-value database that scales automatically, ideal for simple, high-volume access patterns.', `aws rds create-db-instance \\
  --db-instance-identifier codevidya-db \\
  --engine postgres --db-instance-class db.t4g.micro \\
  --allocated-storage 20 \\
  --master-username admin --manage-master-user-password \\
  --backup-retention-period 7

aws dynamodb create-table --table-name Progress \\
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=courseId,AttributeType=S \\
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=courseId,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST`],
      ['Serverless', 'Lambda functions', 'Lambda runs your function in response to events (HTTP requests, S3 uploads, schedules) without managing servers; you pay per request and duration. Put it behind API Gateway or a function URL to build an API.', `// index.mjs  (Node.js 22 runtime)
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? 'learner'
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'Hello ' + name + ' from Lambda!' }),
  }
}

// zip function.zip index.mjs
// aws lambda create-function --function-name hello --runtime nodejs22.x \\
//   --handler index.handler --zip-file fileb://function.zip --role <role-arn>
// aws lambda create-function-url-config --function-name hello --auth-type NONE`],
    ],
    quiz: [
      ['Which service manages users, roles and permissions?', ['EC2', 'IAM', 'S3', 'RDS'], 1, 'Identity and Access Management.'],
      ['What is S3 used for?', ['Running VMs', 'Object (file) storage', 'DNS', 'Email'], 1, 'Simple Storage Service stores objects in buckets.'],
      ['What is the principle of least privilege?', ['Give admins everything', 'Grant only the permissions needed', 'Share root credentials', 'Disable IAM'], 1, 'It limits the blast radius of mistakes or leaks.'],
      ['Lambda is billed by…', ['Monthly server rent', 'Requests and execution time', 'Disk size', 'Number of users'], 1, 'You pay only while code runs.'],
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Web Security Essentials',
    category: 'cs',
    level: 'Intermediate',
    icon: 'Sec',
    color: '#16a34a',
    lang: 'javascript',
    hours: 7,
    tagline: 'Defend apps against the OWASP Top 10.',
    description:
      'Every developer is responsible for security. Learn how the most common web vulnerabilities work (injection, XSS, CSRF, broken authentication) and the defensive coding practices that stop them.',
    outcomes: ['Recognise OWASP Top 10 risks', 'Prevent SQL injection and XSS', 'Store passwords and secrets correctly', 'Configure HTTPS, CORS and security headers'],
    lessons: [
      ['Threats', 'Security mindset and OWASP Top 10', 'The OWASP Top 10 lists the most critical web risks, including broken access control, injection and security misconfiguration. Core principles: never trust user input, apply least privilege, and use defence in depth (several layers of protection).', `// OWASP Top 10 (2021) highlights
const risks = [
  'A01 Broken Access Control',
  'A02 Cryptographic Failures',
  'A03 Injection (SQL, NoSQL, command, XSS)',
  'A05 Security Misconfiguration',
  'A07 Identification & Authentication Failures',
]

// Broken access control: always check ownership on the server
function getCertificate(user, cert) {
  if (cert.ownerId !== user.id && !user.isAdmin) throw new Error('Forbidden')
  return cert
}
console.log(risks.join('\\n'))`],
      ['Injection', 'SQL injection', 'Building SQL by concatenating user input lets attackers rewrite the query: entering `\' OR \'1\'=\'1` can log in without a password. Parameterised queries send data separately from the SQL, so input can never become code.', `// VULNERABLE: input becomes part of the SQL
const unsafe = (email) => "SELECT * FROM users WHERE email = '" + email + "'"
console.log(unsafe("x' OR '1'='1"))
// SELECT * FROM users WHERE email = 'x' OR '1'='1'  -> returns every user!

// SAFE: parameterised query (node-postgres)
// await db.query('SELECT * FROM users WHERE email = $1', [email])

// SAFE: ORMs parameterise for you
// await prisma.user.findUnique({ where: { email } })`],
      ['Injection', 'Cross-site scripting (XSS)', 'XSS happens when user input is rendered as HTML, letting an attacker run scripts in other users\' browsers and steal sessions. Escape output (React does this by default), avoid `innerHTML` with untrusted data, and add a Content-Security-Policy.', `const comment = '<img src=x onerror="alert(\\'stolen \\' + document.cookie)">'

// VULNERABLE: element.innerHTML = comment

// SAFE: treat it as text
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}
console.log(escapeHtml(comment))

// In React, {comment} is escaped automatically.
// Avoid dangerouslySetInnerHTML unless you sanitise (e.g. with DOMPurify).`],
      ['Auth', 'Passwords, sessions and CSRF', 'Hash passwords with a slow algorithm (bcrypt, scrypt or Argon2), never encrypt or store them plainly. Store session tokens in `HttpOnly`, `Secure`, `SameSite` cookies. CSRF tricks a logged-in browser into sending requests; SameSite cookies and CSRF tokens prevent it.', `import bcrypt from 'bcrypt'

const hash = await bcrypt.hash('correct horse battery staple', 12)  // cost factor 12
const ok = await bcrypt.compare(loginAttempt, hash)

res.cookie('session', token, {
  httpOnly: true,     // JavaScript cannot read it (limits XSS damage)
  secure: true,       // HTTPS only
  sameSite: 'lax',    // not sent on cross-site POSTs (CSRF defence)
  maxAge: 60 * 60 * 1000,
})

// Rate-limit login attempts and add MFA for sensitive accounts`],
      ['Hardening', 'HTTPS, CORS, headers and secrets', 'Serve everything over HTTPS. Restrict CORS to the origins you trust. Security headers (via a library like helmet) stop clickjacking and MIME sniffing. Keep secrets in environment variables or a secrets manager, never in git, and keep dependencies patched with `npm audit`.', `import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

const app = express()
app.use(helmet())                       // HSTS, X-Frame-Options, nosniff, CSP...
app.use(cors({ origin: ['https://codevidya.dev'], credentials: true }))

const dbUrl = process.env.DATABASE_URL  // from .env (listed in .gitignore)

// terminal
// npm audit
// npm audit fix
// git secrets --scan   (or GitHub secret scanning)`],
    ],
    quiz: [
      ['What prevents SQL injection?', ['Hiding error messages', 'Parameterised queries', 'Using POST', 'Minifying code'], 1, 'Data is never interpreted as SQL.'],
      ['What does the HttpOnly cookie flag do?', ['Forces HTTPS', 'Stops JavaScript reading the cookie', 'Blocks all cookies', 'Encrypts the cookie'], 1, 'It limits what XSS can steal.'],
      ['How should passwords be stored?', ['Encrypted with AES', 'Hashed with bcrypt/Argon2', 'Plain text in a safe table', 'Base64'], 1, 'Slow salted hashes resist cracking.'],
      ['XSS is mainly prevented by…', ['Escaping output and a CSP', 'Using SQL', 'Longer passwords', 'Disabling CORS'], 0, 'Untrusted input must never render as HTML.'],
    ],
  },
]
