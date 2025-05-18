class RewardModel {
  final String id;
  final String name;
  final String description;
  final int requiredPoints;
  final String type; // 'sticker', 'character', 'theme'
  final String imageUrl;
  final bool isLocked;

  RewardModel({
    required this.id,
    required this.name,
    required this.description,
    required this.requiredPoints,
    required this.type,
    required this.imageUrl,
    this.isLocked = true,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'requiredPoints': requiredPoints,
      'type': type,
      'imageUrl': imageUrl,
      'isLocked': isLocked,
    };
  }

  factory RewardModel.fromMap(Map<String, dynamic> map) {
    return RewardModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      description: map['description'] ?? '',
      requiredPoints: map['requiredPoints'] ?? 0,
      type: map['type'] ?? '',
      imageUrl: map['imageUrl'] ?? '',
      isLocked: map['isLocked'] ?? true,
    );
  }
} 