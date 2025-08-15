pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -g pm2'
            }
        }

        stage('Clean Port') {
            steps {
                sh '''
                PORT=3000
                PID=$(lsof -ti tcp:$PORT)
                if [ -n "$PID" ]; then
                  echo "Killing process on port $PORT (PID: $PID)"
                  kill -9 $PID
                else
                  echo "Port $PORT is free"
                fi
                '''
            }
        }

        stage('Restart Application') {
            steps {
                sh '''
                pm2 delete express-app || true
                pm2 start server.js --name express-app
                pm2 logs express-app --lines 10
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5
                curl -f http://localhost:3000 || {
                  echo "Health check failed"
                  exit 1
                }
                echo "Health check passed"
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs above for details.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
