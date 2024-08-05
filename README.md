
# File Manager

## Overview
A File manager with React Frontend and [Rails Backend](https://github.com/voidzenn/file_manager). Allows users to manage their files and folders seamlessly. The app uses Minio for object storage, ensuring that the structure in the File Manager UI mirrors the structure in Minio, providing a reliable and intuitive user experience. Additionally, the app features real-time updates with ActionCable, allowing users to see changes immediately as they happen.

## Features
- **Folder Management:**
  - Create Folder
  - Create Nested Folder
  - Rename Folder
  - Remove Folder
  - Get Folder List

- **File Management:**
  - Create File
  - Create File inside a Folder
  - Rename File
  - Remove File
  - View File

## Technology Stack
- **React 18**: Framework
- **Zustand**: State management library
- **Shadcn**: Component library
- **ActionCable**: Real-time updates
- **Zod**: Schema validation

## Preview
![Screenshot from 2024-08-05 17-49-49](https://github.com/user-attachments/assets/526ace27-cc08-4037-b754-dc5dfb15a803)
![Screenshot from 2024-08-05 17-50-25](https://github.com/user-attachments/assets/327fe08a-13ce-4d5c-9bf5-076900658301)
![Screenshot from 2024-08-05 17-50-28](https://github.com/user-attachments/assets/4ebdb208-39af-402c-9f79-4add5a83d14f)

## Backend API Documentation
- When accessing BE documentation you need follow the [steps](https://github.com/voidzenn/file_manager?tab=readme-ov-file#setup).
![Screenshot from 2024-08-05 17-48-37](https://github.com/user-attachments/assets/0cf0fd63-f738-4b64-a5ea-d890b878b707)

## Setup

### Prerequisites
Dependencies installed on your machine
- Node.js version 14.0.0 or higher
- Npm or Yarn
### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/voidzenn/file_manager_fe.git
   cd <repository-name>
   ```

2. **Rename .env.example to .env:**
   ```bash
   mv .env.example .env
   ```
3. **Install dependencies:**
   ```bash
   npm install
   # or 
   yarn install
   ```

4. **Run the app:**
   ```bash
   yarn dev
   ```

5. **Access the web application:**

   Open your browser and navigate to [http://localhost:3001](http://localhost:3001)
