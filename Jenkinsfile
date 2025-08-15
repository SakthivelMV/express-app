pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v && npm -v'
                sh 'npm install'
            }
        }

        stage('Clean Port') {
            steps {
                sh '''
                    PORT=3000
                    PID=$(lsof -ti tcp:$PORT)
                    if [ ! -z "$PID" ]; then
                      kill -9 $PID || true
                    fi
                '''
            }
        }

        stage('Restart Application') {
            steps {
                sh '''
                    npx pm2 delete all || true
                    npx pm2 start index.js --name express-app
                    npx pm2 save
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:3000/health || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above for details.'
        }
    }
}
