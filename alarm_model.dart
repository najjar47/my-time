import 'package:cloud_firestore/cloud_firestore.dart';

class AlarmModel {
  final String id;
  final String userId;
  final String title;
  final DateTime time;
  final bool isActive;
  final List<String> repeatDays; // ['monday', 'tuesday', etc.]
  final String ringtoneUrl;
  final String ringtoneName;
  final bool vibrate;
  final int snoozeMinutes;
  final Map<String, dynamic>? customData;

  AlarmModel({
    required this.id,
    required this.userId,
    required this.title,
    required this.time,
    this.isActive = true,
    this.repeatDays = const [],
    required this.ringtoneUrl,
    required this.ringtoneName,
    this.vibrate = true,
    this.snoozeMinutes = 5,
    this.customData,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'time': Timestamp.fromDate(time),
      'isActive': isActive,
      'repeatDays': repeatDays,
      'ringtoneUrl': ringtoneUrl,
      'ringtoneName': ringtoneName,
      'vibrate': vibrate,
      'snoozeMinutes': snoozeMinutes,
      'customData': customData,
    };
  }

  factory AlarmModel.fromMap(Map<String, dynamic> map) {
    return AlarmModel(
      id: map['id'] ?? '',
      userId: map['userId'] ?? '',
      title: map['title'] ?? '',
      time: (map['time'] as Timestamp).toDate(),
      isActive: map['isActive'] ?? true,
      repeatDays: List<String>.from(map['repeatDays'] ?? []),
      ringtoneUrl: map['ringtoneUrl'] ?? '',
      ringtoneName: map['ringtoneName'] ?? '',
      vibrate: map['vibrate'] ?? true,
      snoozeMinutes: map['snoozeMinutes'] ?? 5,
      customData: map['customData'],
    );
  }

  AlarmModel copyWith({
    String? id,
    String? userId,
    String? title,
    DateTime? time,
    bool? isActive,
    List<String>? repeatDays,
    String? ringtoneUrl,
    String? ringtoneName,
    bool? vibrate,
    int? snoozeMinutes,
    Map<String, dynamic>? customData,
  }) {
    return AlarmModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      time: time ?? this.time,
      isActive: isActive ?? this.isActive,
      repeatDays: repeatDays ?? this.repeatDays,
      ringtoneUrl: ringtoneUrl ?? this.ringtoneUrl,
      ringtoneName: ringtoneName ?? this.ringtoneName,
      vibrate: vibrate ?? this.vibrate,
      snoozeMinutes: snoozeMinutes ?? this.snoozeMinutes,
      customData: customData ?? this.customData,
    );
  }
} 