#!/bin/bash
# Patch @astrojs/vercel to support Node.js 24

ADAPTER_FILE="node_modules/@astrojs/vercel/dist/serverless/adapter.js"

if [ -f "$ADAPTER_FILE" ]; then
  # Replace the SUPPORTED_NODE_VERSIONS object to include Node.js 24
  sed -i '' 's/const SUPPORTED_NODE_VERSIONS = {[^}]*}/const SUPPORTED_NODE_VERSIONS = {\n  16: { status: "deprecated", removal: \/\* @__PURE__ *\/ new Date("February 6 2024") },\n  18: { status: "deprecated" },\n  20: { status: "current" },\n  22: { status: "current" },\n  24: { status: "current" }\n}/' "$ADAPTER_FILE"
  echo "Patched @astrojs/vercel adapter for Node.js 24 support"
fi
