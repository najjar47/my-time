class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.monthNames = [
            'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];
        this.dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.addEventListeners();
    }

    renderCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const monthLength = lastDay.getDate();

        // تحديث عنوان الشهر
        document.getElementById('currentMonth').textContent = 
            `${this.monthNames[this.currentMonth]} ${this.currentYear}`;

        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // إضافة أسماء الأيام
        this.dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-name';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // إضافة الأيام الفارغة في بداية الشهر
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // إضافة أيام الشهر
        for (let day = 1; day <= monthLength; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // تمييز اليوم الحالي
            if (day === this.date.getDate() && 
                this.currentMonth === this.date.getMonth() && 
                this.currentYear === this.date.getFullYear()) {
                dayElement.classList.add('current-day');
            }

            // إضافة المهام لهذا اليوم
            const tasksForDay = this.getTasksForDay(day);
            if (tasksForDay.length > 0) {
                const taskIndicator = document.createElement('div');
                taskIndicator.className = 'task-indicator';
                taskIndicator.textContent = tasksForDay.length;
                dayElement.appendChild(taskIndicator);

                // إضافة قائمة المهام عند تحريك الماوس
                dayElement.addEventListener('mouseover', () => {
                    this.showTasksTooltip(dayElement, tasksForDay);
                });

                dayElement.addEventListener('mouseout', () => {
                    this.hideTasksTooltip();
                });
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    addEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
    }

    getTasksForDay(day) {
        // استرجاع المهام من حالة التطبيق
        return state.tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            return taskDate.getDate() === day &&
                   taskDate.getMonth() === this.currentMonth &&
                   taskDate.getFullYear() === this.currentYear;
        });
    }

    showTasksTooltip(element, tasks) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tasks-tooltip';
        tooltip.innerHTML = `
            <h4>مهام اليوم</h4>
            ${tasks.map(task => `
                <div class="tooltip-task ${task.completed ? 'completed' : ''}">
                    <span>${task.title}</span>
                    <span>${task.time}</span>
                </div>
            `).join('')}
        `;

        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(tooltip);
    }

    hideTasksTooltip() {
        const tooltip = document.querySelector('.tasks-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// إنشاء التقويم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
}); 