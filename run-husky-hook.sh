#!/bin/sh
HOOK_NAME=$1
. "$(dirname "$0")/.husky/_/husky.sh"

case $HOOK_NAME in
  "pre-commit")
    echo "Running pre-commit hook"
    ;;
  *)
    echo "Unknown hook: $HOOK_NAME"
    exit 1
    ;;
esac

# запуск проверки работы husky, команада в консоли ./run-husky-hook.sh pre-commit