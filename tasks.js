class TaskManager {
    constructor() {
        this.tasks = state.tasks;
        this.sounds = {
            success: new Audio('sounds/success.mp3'),
            notification: new Audio('sounds/notification.mp3')
        };
        this.init();
    }

    init() {
        this.setupNotifications();
        this.loadSavedTasks();
        this.startTaskReminders();
    }

    // تحميل المهام المحفوظة
    loadSavedTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            state.tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }

    // حفظ المهام
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }

    // إضافة مهمة جديدة
    addTask(taskData) {
        const task = {
            id: Date.now().toString(),
            ...taskData,
            completed: false,
            createdAt: new Date(),
            notifications: []
        };

        state.tasks.push(task);
        this.saveTasks();
        renderTasks();
        this.scheduleTaskReminder(task);
    }

    // إكمال مهمة
    completeTask(taskId) {
        const task = state.tasks.find(t => t.id === taskId);
        if (task && !task.completed) {
            task.completed = true;
            task.completedAt = new Date();
            state.points += task.points;
            
            this.saveTasks();
            updatePoints();
            renderTasks();
            this.playSuccessSound();
            this.checkAchievements();
        }
    }

    // جدولة التذكير بالمهام
    scheduleTaskReminder(task) {
        const taskTime = new Date(task.scheduledTime);
        const now = new Date();
        
        if (taskTime > now) {
            const timeUntilTask = taskTime - now;
            
            // تذكير قبل 5 دقائق
            setTimeout(() => {
                if (!task.completed) {
                    this.showNotification(
                        'تذكير بالمهمة',
                        `موعد "${task.title}" بعد 5 دقائق`
                    );
                }
            }, timeUntilTask - 5 * 60 * 1000);

            // تذكير في وقت المهمة
            setTimeout(() => {
                if (!task.completed) {
                    this.showNotification(
                        'حان موعد المهمة',
                        `حان وقت "${task.title}"`
                    );
                }
            }, timeUntilTask);
        }
    }

    // إعداد الإشعارات
    async setupNotifications() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('تم تفعيل الإشعارات');
            }
        } catch (error) {
            console.error('خطأ في تفعيل الإشعارات:', error);
        }
    }

    // عرض إشعار
    showNotification(title, body) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body,
                icon: 'images/logo.png',
                badge: 'images/badge.png'
            });

            this.sounds.notification.play().catch(console.error);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    }

    // تشغيل صوت النجاح
    playSuccessSound() {
        this.sounds.success.play().catch(console.error);
    }

    // التحقق من الإنجازات
    checkAchievements() {
        const completedTasks = state.tasks.filter(t => t.completed).length;
        
        const achievements = {
            firstTask: { count: 1, points: 50, message: 'أكملت أول مهمة!' },
            fiveTasks: { count: 5, points: 100, message: 'أكملت 5 مهام!' },
            tenTasks: { count: 10, points: 200, message: 'أكملت 10 مهام!' }
        };

        for (const [key, achievement] of Object.entries(achievements)) {
            if (completedTasks === achievement.count) {
                state.points += achievement.points;
                this.showNotification('إنجاز جديد!', achievement.message);
                updatePoints();
            }
        }
    }

    // بدء نظام التذكير بالمهام
    startTaskReminders() {
        setInterval(() => {
            const now = new Date();
            state.tasks.forEach(task => {
                if (!task.completed) {
                    const taskTime = new Date(task.scheduledTime);
                    const timeDiff = taskTime - now;
                    
                    // تذكير قبل 5 دقائق
                    if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
                        this.showNotification(
                            'تذكير بالمهمة',
                            `موعد "${task.title}" بعد ${Math.ceil(timeDiff / 60000)} دقائق`
                        );
                    }
                }
            });
        }, 60000); // فحص كل دقيقة
    }
}

// إنشاء مدير المهام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
}); 