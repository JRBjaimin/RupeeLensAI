.
├── .DS_Store
├── .bundle
│   └── config
├── .codex
│   └── environments
│       └── environment.toml
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .qodo
│   ├── agents
│   └── workflows
├── .vscode
│   └── settings.json
├── .watchmanconfig
├── App.tsx
├── Gemfile
├── NOTIFICATION_NAVIGATION.md
├── README.md
├── __tests__
│   └── App.test.tsx
├── app.json
├── babel.config.js
├── folder_structure.md
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── scripts
│   └── generateFeature.js
├── src
│   ├── app
│   │   ├── App.tsx
│   │   └── BackgroundLocationManager.tsx
│   ├── assets
│   │   ├── .DS_Store
│   │   ├── images
│   │   │   └── default.png
│   │   └── logo.png
│   ├── components
│   │   ├── .DS_Store
│   │   ├── Badge
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   ├── Button
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Calendar
│   │   │   └── Calendar.tsx
│   │   ├── Card
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Header
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── IconButton
│   │   │   └── IconButton.tsx
│   │   ├── Input
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── LoadingSpinner
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── index.ts
│   │   ├── Toasts
│   │   │   ├── ToastProvider.tsx
│   │   │   ├── Toasts.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── navigation
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── redux
│   │   ├── slices
│   │   │   ├── adminDashboardSlice.ts
│   │   │   ├── attendanceSlice.ts
│   │   │   ├── authSlice.ts
│   │   │   ├── locationSlice.ts
│   │   │   ├── projectSlice.ts
│   │   │   └── usersSlice.ts
│   │   └── store
│   │       └── index.ts
│   ├── screens
│   │   ├── auth
│   │   │   ├── authHooks.ts
│   │   │   ├── authServices.ts
│   │   │   ├── authTypes.ts
│   │   │   ├── index.ts
│   │   │   ├── login
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── style.tsx
│   │   │   └── splash
│   │   │       ├── SplashScreen.tsx
│   │   │       └── style.tsx
│   │   └── main
│   │       ├── adduser
│   │       │   ├── AddUserScreen.tsx
│   │       │   ├── index.ts
│   │       │   └── style.tsx
│   │       ├── adminattendance
│   │       │   ├── AdminAttendanceScreen.tsx
│   │       │   └── styles.ts
│   │       ├── adminattendancedetails
│   │       │   ├── AdminAttendanceDetailsScreen.tsx
│   │       │   ├── index.ts
│   │       │   └── styles.ts
│   │       ├── admindashboard
│   │       │   ├── AdminDashboard.tsx
│   │       │   ├── index.ts
│   │       │   └── style.tsx
│   │       ├── applyleave
│   │       │   ├── ApplyLeaveScreen.tsx
│   │       │   └── styles.ts
│   │       ├── attendance
│   │       │   ├── AttendanceScreen.tsx
│   │       │   ├── components
│   │       │   │   ├── AttendanceCalendar.tsx
│   │       │   │   └── AttendanceHistoryItem.tsx
│   │       │   └── styles.ts
│   │       ├── dashboard
│   │       │   ├── DashboardScreen.tsx
│   │       │   └── style.tsx
│   │       ├── dpr
│   │       │   ├── DPRScreen.tsx
│   │       │   └── style.tsx
│   │       ├── employeedashboard
│   │       │   ├── EmployeeDashboard.tsx
│   │       │   ├── index.ts
│   │       │   └── style.tsx
│   │       ├── holidays
│   │       │   ├── HolidayListScreen.tsx
│   │       │   ├── style.tsx
│   │       │   └── types.ts
│   │       ├── leave
│   │       │   ├── LeaveScreen.tsx
│   │       │   ├── styles.ts
│   │       │   └── types.ts
│   │       ├── leavedetails
│   │       │   ├── LeaveDetailsScreen.tsx
│   │       │   └── styles.ts
│   │       ├── leaverequests
│   │       │   ├── LeaveRequestsScreen.tsx
│   │       │   └── style.tsx
│   │       ├── notifications
│   │       │   ├── NotificationScreen.tsx
│   │       │   ├── components
│   │       │   │   └── NotificationItem.tsx
│   │       │   └── style.ts
│   │       ├── overtime
│   │       │   ├── ApplyOvertimeScreen.tsx
│   │       │   ├── OvertimeScreen.tsx
│   │       │   └── styles.ts
│   │       ├── overtimedetails
│   │       │   ├── OvertimeDetailsScreen.tsx
│   │       │   └── styles.ts
│   │       ├── overtimerequests
│   │       │   ├── OvertimeRequestsScreen.tsx
│   │       │   └── style.tsx
│   │       ├── privacy
│   │       │   ├── PrivacyPolicyScreen.tsx
│   │       │   └── style.tsx
│   │       ├── profile
│   │       │   ├── EditProfileScreen.tsx
│   │       │   ├── ProfileScreen.tsx
│   │       │   ├── components
│   │       │   │   └── loginModel
│   │       │   │       ├── LogoutModel.tsx
│   │       │   │       └── styles.tsx
│   │       │   ├── editProfileStyle.tsx
│   │       │   └── style.tsx
│   │       ├── projectdetails
│   │       │   ├── ProjectDetailsScreen.tsx
│   │       │   └── style.tsx
│   │       ├── projects
│   │       │   ├── ProjectsScreen.tsx
│   │       │   └── styles.ts
│   │       ├── todaysleave
│   │       │   ├── TodaysLeaveScreen.tsx
│   │       │   └── style.ts
│   │       ├── userdetails
│   │       │   ├── UserDetailsScreen.tsx
│   │       │   ├── index.ts
│   │       │   └── style.tsx
│   │       └── users
│   │           ├── UsersScreen.tsx
│   │           └── style.tsx
│   ├── services
│   │   ├── api
│   │   │   ├── apiService.ts
│   │   │   ├── endpoints.ts
│   │   │   └── index.ts
│   │   ├── apiClient.ts
│   │   ├── attendanceService.ts
│   │   ├── dashboardService.ts
│   │   ├── holidayServices.ts
│   │   ├── leaveService.ts
│   │   ├── location
│   │   │   └── backgroundLocationService.ts
│   │   ├── notificationService.ts
│   │   ├── overtimeService.ts
│   │   └── projectService.ts
│   ├── theme
│   │   ├── ThemeContext.tsx
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   └── tokens.ts
│   ├── types
│   │   ├── index.ts
│   │   ├── notification.ts
│   │   └── react-native-vector-icons.d.ts
│   └── utils
│       ├── dateUtils.ts
│       ├── helperFunctions.ts
│       ├── locationUtils.ts
│       ├── navigationHelper.ts
│       ├── permissionUtils.ts
│       ├── storageUtils.ts
│       └── validationUtils.ts
├── tsconfig.json
└── yarn.lock
