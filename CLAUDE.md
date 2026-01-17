# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

@vt7/kit là một monorepo chứa các package tiện ích cho phát triển web, được xây dựng bằng TypeScript với ESM-first approach.

## Commands

```bash
# Cài đặt dependencies
pnpm install

# Build tất cả packages
pnpm build

# Build stub cho development
pnpm build:stub

# Chạy toàn bộ test suite (lint + type-check + vitest với coverage)
pnpm test

# Chỉ kiểm tra types
pnpm test:types

# Lint
pnpm lint
pnpm lint:fix

# Watch mode cho development (chạy trong từng package)
pnpm run dev

# Versioning và publish
pnpm ci:version
pnpm ci:publish
```

## Architecture

### Monorepo Structure

```
packages/
├── utils/              # Core utilities (không có dependencies)
├── fetch/              # Axios wrapper (phụ thuộc @vt7/utils)
├── composables/        # Vue 3 composables (phụ thuộc @vt7/utils, peer: @vueuse/core)
├── iconify/            # CLI tool tạo iconify JSON từ SVG
└── tailwind-purge-icon/ # Tailwind plugin cho iconify icons
```

### Build Output

Mỗi package được build thành 3 formats:
- CommonJS (`.cjs`)
- ESM (`.mjs`)
- TypeScript declarations (`.d.ts`)

Build tool: **unbuild**

### Package Dependencies Flow

```
@vt7/utils (core, zero deps)
    ↓
@vt7/fetch (axios wrapper)
@vt7/composables (Vue composables)
@vt7/iconify (CLI tool)
@vt7/tailwind-purge-icon (Tailwind plugin)
```

## Testing

- Framework: **Vitest**
- Test files: `packages/*/test/*.test.ts`
- Coverage: @vitest/coverage-v8

## Code Style

- **Không dùng semicolons**
- Single quotes
- 2 spaces indent
- Print width: 120
- Arrow parens: avoid khi có thể
- ESLint config: `eslint-config-unjs`

## Monorepo Tools

- **Lerna**: version management
- **pnpm workspaces**: package linking
- Current version: 6.6.0