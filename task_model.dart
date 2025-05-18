import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String id;
  final String userId;
  final String title;
  final String description;
  final DateTime scheduledTime;
  final bool isCompleted;
  final int points;
  final String category; // 'daily', 'bedtime', 'challenge', 'learning'
  final String icon;
  final bool isRecurring;
  final List<String> recurringDays; // ['monday', 'wednesday', etc.]
  final String? parentId; // للمهام المعينة من قبل الوالدين
  final DateTime createdAt;
  final DateTime? completedAt;
  final String? audioMessage; // رسالة صوتية تحفيزية
  final Map<String, dynamic>? customData; // بيانات إضافية حسب نوع المهمة

  TaskModel({
    required this.id,
    required this.userId,
    required this.title,
    required this.description,
    required this.scheduledTime,
    this.isCompleted = false,
    this.points = 10,
    required this.category,
    required this.icon,
    this.isRecurring = false,
    this.recurringDays = const [],
    this.parentId,
    required this.createdAt,
    this.completedAt,
    this.audioMessage,
    this.customData,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'description': description,
      'scheduledTime': Timestamp.fromDate(scheduledTime),
      'isCompleted': isCompleted,
      'points': points,
      'category': category,
      'icon': icon,
      'isRecurring': isRecurring,
      'recurringDays': recurringDays,
      'parentId': parentId,
      'createdAt': Timestamp.fromDate(createdAt),
      'completedAt': completedAt != null ? Timestamp.fromDate(completedAt!) : null,
      'audioMessage': audioMessage,
      'customData': customData,
    };
  }

  factory TaskModel.fromMap(Map<String, dynamic> map) {
    return TaskModel(
      id: map['id'] ?? '',
      userId: map['userId'] ?? '',
      title: map['title'] ?? '',
      description: map['description'] ?? '',
      scheduledTime: (map['scheduledTime'] as Timestamp).toDate(),
      isCompleted: map['isCompleted'] ?? false,
      points: map['points'] ?? 10,
      category: map['category'] ?? '',
      icon: map['icon'] ?? '',
      isRecurring: map['isRecurring'] ?? false,
      recurringDays: List<String>.from(map['recurringDays'] ?? []),
      parentId: map['parentId'],
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      completedAt: map['completedAt'] != null 
          ? (map['completedAt'] as Timestamp).toDate()
          : null,
      audioMessage: map['audioMessage'],
      customData: map['customData'],
    );
  }

  TaskModel copyWith({
    String? id,
    String? userId,
    String? title,
    String? description,
    DateTime? scheduledTime,
    bool? isCompleted,
    int? points,
    String? category,
    String? icon,
    bool? isRecurring,
    List<String>? recurringDays,
    String? parentId,
    DateTime? createdAt,
    DateTime? completedAt,
    String? audioMessage,
    Map<String, dynamic>? customData,
  }) {
    return TaskModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      description: description ?? this.description,
      scheduledTime: scheduledTime ?? this.scheduledTime,
      isCompleted: isCompleted ?? this.isCompleted,
      points: points ?? this.points,
      category: category ?? this.category,
      icon: icon ?? this.icon,
      isRecurring: isRecurring ?? this.isRecurring,
      recurringDays: recurringDays ?? this.recurringDays,
      parentId: parentId ?? this.parentId,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
      audioMessage: audioMessage ?? this.audioMessage,
      customData: customData ?? this.customData,
    );
  }
} 