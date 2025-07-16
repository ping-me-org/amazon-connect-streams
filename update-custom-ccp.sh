#!/bin/bash

# Custom CCP Update Script
# This script helps maintain your custom CCP fork and rebuild when needed

set -e

echo "🔄 Custom CCP Update Script"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FORK_DIR="/Users/chadcompton/dev/www/scorch/ping/external-repos/amazon-connect-streams"
PROJECT_DIR="/Users/chadcompton/dev/www/scorch/ping/ping-mono/packages/forge-tel/src/frontend/connect-phone/public"
CUSTOM_BRANCH="custom-styling"
ORG_REPO="ping-me-org/amazon-connect-streams"

# Function to print colored output
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "$FORK_DIR" ]; then
    print_error "Fork directory not found: $FORK_DIR"
    exit 1
fi

cd "$FORK_DIR"

# Function to sync with upstream
sync_upstream() {
    print_status "Syncing with upstream amazon-connect/amazon-connect-streams..."
    
    # Fetch upstream changes
    git fetch upstream
    
    # Switch to master and update
    git checkout master
    git merge upstream/master
    
    # Switch back to custom branch and rebase
    git checkout "$CUSTOM_BRANCH"
    git rebase master
    
    print_success "Upstream sync completed"
}

# Function to build custom CCP
build_custom() {
    print_status "Building custom CCP..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build the custom version
    npm run build-streams
    
    print_success "Build completed"
}

# Function to deploy to project
deploy_to_project() {
    print_status "Deploying to project..."
    
    if [ ! -f "release/connect-streams-min.js" ]; then
        print_error "Built file not found. Run build first."
        exit 1
    fi
    
    # Copy to project
    cp release/connect-streams-min.js "$PROJECT_DIR/"
    
    print_success "Deployed to project: $PROJECT_DIR/connect-streams-min.js"
}

# Function to show current status
show_status() {
    print_status "Current status:"
    echo "  Fork directory: $FORK_DIR"
    echo "  Current branch: $(git branch --show-current)"
    echo "  Project directory: $PROJECT_DIR"
    
    if [ -f "release/connect-streams-min.js" ]; then
        echo "  Built file size: $(ls -lh release/connect-streams-min.js | awk '{print $5}')"
        echo "  Built file date: $(ls -l release/connect-streams-min.js | awk '{print $6, $7, $8}')"
    else
        print_warning "No built file found"
    fi
}

# Main script logic
case "${1:-help}" in
    "sync")
        sync_upstream
        ;;
    "build")
        build_custom
        ;;
    "deploy")
        deploy_to_project
        ;;
    "full")
        sync_upstream
        build_custom
        deploy_to_project
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        echo "Usage: $0 {sync|build|deploy|full|status|help}"
        echo ""
        echo "Commands:"
        echo "  sync    - Sync with upstream and rebase custom changes"
        echo "  build   - Build the custom CCP"
        echo "  deploy  - Deploy built file to project"
        echo "  full    - Run sync, build, and deploy in sequence"
        echo "  status  - Show current status"
        echo "  help    - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 full     # Complete update cycle"
        echo "  $0 build    # Just rebuild after making changes"
        echo "  $0 deploy   # Just copy existing build to project"
        ;;
esac
