# Changelog

## [2.2.2] - 2026-06-23

### Custom Window Controls & App Icon Update

### Added
- **Custom TitleBar component** (`src/components/TitleBar.tsx`):
  - Close button (hides window to tray, consistent with existing close behavior)
  - Minimize button
  - Maximize / Restore toggle button (icon changes based on window state)
  - "SONU" label on the left side
  - Draggable region — window can be moved by dragging the title bar
  - Double-click on title bar toggles maximize
- **Window control permissions** in `capabilities/default.json`:
  - Added `core:window:allow-minimize`, `allow-maximize`, `allow-unmaximize`, `allow-toggle-maximize`, `allow-close`, `allow-hide`, `allow-is-maximized`, `allow-start-dragging`, `allow-set-focus`
  - These permissions were missing, causing window controls and drag to silently fail

### Fixed
- **Drag region and button conflict**: TitleBar buttons no longer trigger window drag — `onMouseDown` + `stopPropagation()` prevents drag event from reaching parent
- **Removed `data-tauri-drag-region="false"` workaround**: Replaced with proper event propagation control
- **Drag region only on non-interactive areas**: Only the title text, spacer, and logo area have `data-tauri-drag-region` — buttons are outside drag region

### Changed
- **App icon updated** from default Tauri icon to custom `icon.png`:
  - Generated all required PNG sizes: 32×32, 64×64, 128×128, 128×128@2x (256), 192×192, 512×512
  - Generated `icon.ico` (Windows) with 7 sizes: 16–256px
  - Generated `icon.icns` (macOS) with all standard Apple sizes
  - Generated Windows Store logos (Square30 through Square310, StoreLogo)
  - Generated Android mipmap icons (mdpi through xxxhdpi) with adaptive foreground
  - Generated iOS AppIcon set (20px through 1024px)
  - Generated tray icons (22×22, 32×32) and maskable icon (512×512)
  - Updated `tauri.conf.json` bundle icon list to include all new sizes
- **App.tsx** simplified:
  - Removed old fixed drag region (`<div data-tauri-drag-region>`)
  - Removed unused `getCurrentWindow` import and `handleDoubleClick` handler
  - Replaced with `<TitleBar />` component

---

## [2.1.0] - 2026-01-13 (SONU Release)

### Added

- **SONU Branding**: Complete rebrand from Handy to SONU - Offline Voice Typing
- **Wispr Flow-Inspired UI**: Dark graphite theme with glassmorphism effects
- **Floating Overlay Widget**: Beautiful recording indicator with waveform visualization
- **New Logo**: Refreshed microphone-based logo with indigo/purple gradient
- **Credits Section**: Added SONU and Handy credits in About settings
- **Ko-fi Support**: Added support link for the project

### Changed

- Version bump to 2.1.0
- Updated all icons (taskbar, system tray, app icon) to SONU branding
- Tray menu now shows "SONU v2.1.0" instead of "Handy"
- Updated README with comprehensive documentation
- Cleaned up CSS with proper dark theme variables
- Removed conflicting tweakCN theme declarations
- Updated updater endpoint to SONU GitHub releases

### Fixed

- CSS import error with tw-animate-css
- Font issues (removed Architects Daughter, using system fonts)
- Dark theme now properly enforced throughout the app
- Sidebar and footer styling consistency

### Technical

- Simplified App.css with clean Wispr Flow color palette
- Updated index.html with dark class and SONU title
- Proper system font stack for cross-platform consistency

---

## [0.3.0] - 2025-07-11

### Added

- **Translate to English** setting: Added automatic translation of speech to English
- Settings refactored into React hooks for better state management
- Audio device switching capability
- Hysteresis to VAD (Voice Activity Detection) for more stable recording

### Changed

- Major audio backend refactor for improved performance and reliability
- Moved audio toolkit into src-tauri directory for better permissions handling
- Model files no longer need to be downloaded separately for releases
- Updated settings components and transcription logic

### Fixed

- Audio toolkit permissions issues
- Various stability improvements

## [0.2.3] - 2025-07-03

### Fixed

- Keycode bug that was causing input issues
- Whisper model optimization: switched to unquantized Whisper Turbo, updated Whisper Medium quantization to 4_1

## [0.2.2] - 2025-07-02

### Fixed

- Removed 50ms delay feature flag for Windows (now applies to all platforms for consistency)

## [0.2.1] - 2025-07-01

### Added

- Ctrl+Space key binding for Windows platform

### Fixed

- Windows crash issue
- Model loading on startup when available
- Windows paste functionality bug

## [0.2.0] - 2025-06-30

### Added

- **Microphone activation on demand**: More efficient resource usage
- Less permissive VAD settings for better accuracy

### Changed

- Improved microphone management and activation system

## [0.1.6] - 2025-06-30

### Added

- **Multiple models support**: Users can now select from different transcription models
- Model selection onboarding flow
- Cleanup and refactoring of model management

### Changed

- Enhanced user experience with model selection interface
- Better language and UI tweaks

## [0.1.5] - 2025-06-27

### Added

- **Different start and stop recording sounds**: Enhanced audio feedback
- Recording sound samples for better user experience

## [0.1.4] - 2025-06-27

### Fixed

- Build issues
- Auto-update functionality improvements

## [0.1.3] - 2025-06-26

### Fixed

- Paste functionality using enigo library for better cross-platform compatibility

## [0.1.2] - 2025-06-26

### Added

- **Auto-update functionality**: Application can now automatically update itself
- Footer displaying current version
- Improved menu system

### Changed

- Better user interface for version management
- Enhanced update workflow

## [0.1.1] - 2025-06-25

### Added

- **Comprehensive build system**: Support for Windows, macOS, and Linux
- Windows code signing for trusted installation
- Ubuntu/Linux build support with Vulkan
- Model file download and packaging for releases
- GitHub Actions CI/CD workflow

### Changed

- Improved build process and release workflow
- Better cross-platform compatibility

### Fixed

- Various build-related issues across platforms

## [0.1.0] - 2025-05-16

### Added

- **Initial release** of Handy
- Basic speech-to-text transcription functionality
- Voice Activity Detection (VAD) for automatic recording
- Cross-platform support (macOS, Windows, Linux)
- **Tauri-based desktop application** with React frontend
- **Global keyboard shortcuts** for activation
- **Clipboard integration** for automatic text insertion
- **LLM integration** for enhanced transcription processing
- **Configurable settings** including:
  - Custom key bindings
  - Audio device selection
  - Microphone settings
  - Push-to-talk functionality
- **System tray integration** with recording indicators
- **Accessibility permissions** handling for macOS
- **Settings persistence** with unified settings store
- **Background operation** capability
- **Multiple audio format support** with on-the-fly resampling
- **Whisper model integration** for high-quality transcription
- **MIT License** for open-source distribution

### Technical Implementation

- Built with Tauri (Rust backend) and React (TypeScript frontend)
- Audio processing with cpal and whisper-rs
- Real-time transcription with performance optimizations
- Cross-platform keyboard event handling
- Modular architecture with managers for audio, models, and transcription
