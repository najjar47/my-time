class UserModel {
  final String uid;
  final String name;
  final String email;
  final int points;
  final String parentEmail;
  final int age;
  final String gender;
  final String grade;
  final String country;
  final String city;

  UserModel({
    required this.uid,
    required this.name,
    required this.email,
    this.points = 0,
    this.parentEmail = '',
    required this.age,
    required this.gender,
    required this.grade,
    required this.country,
    required this.city,
  });

  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'name': name,
      'email': email,
      'points': points,
      'parentEmail': parentEmail,
      'age': age,
      'gender': gender,
      'grade': grade,
      'country': country,
      'city': city,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      uid: map['uid'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      points: map['points'] ?? 0,
      parentEmail: map['parentEmail'] ?? '',
      age: map['age'] ?? 0,
      gender: map['gender'] ?? '',
      grade: map['grade'] ?? '',
      country: map['country'] ?? '',
      city: map['city'] ?? '',
    );
  }
} 