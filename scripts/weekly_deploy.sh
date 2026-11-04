#!/bin/zsh
# The one Netlify deploy of the week (Free plan). Commits stay on this Mac during the week; this
# pushes them together, only if the committed code builds. Uncommitted edits are never included.
# Run it by hand, or by launchd on Sundays at 12:00: scripts/com.muthamil.website.weekly-deploy.plist
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
cd "$(dirname "$0")/.." || exit 1
LOG="$PWD/scripts/weekly-deploy.log"
{
  echo "=== $(date '+%F %T')"
  git fetch -q origin main || { echo "fetch failed"; exit 1; }
  ahead=$(git rev-list --count origin/main..main)
  [ "$ahead" = 0 ] && { echo "nothing to deploy"; exit 0; }
  tmp=$(mktemp -d)
  git worktree add -q --detach "$tmp" main || exit 1
  ln -s "$PWD/node_modules" "$tmp/node_modules"
  if (cd "$tmp" && npm run build >/dev/null 2>&1); then
    git push -q origin main && echo "pushed $ahead commit(s): deploy started" || echo "push failed"
  else
    echo "build failed: nothing pushed, fix it first"
  fi
  git worktree remove --force "$tmp"
} >> "$LOG" 2>&1
