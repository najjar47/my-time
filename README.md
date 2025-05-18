# وقتي - تطبيق إدارة المهام للأطفال

تطبيق يساعد الأطفال على تنظيم مهامهم اليومية بطريقة ممتعة وتفاعلية.

## متطلبات التشغيل

- Flutter SDK (2.19.0 أو أحدث)
- Firebase حساب
- Android Studio / Xcode (للنشر على المتاجر)

## خطوات الإعداد

1. إعداد Firebase:
   - قم بإنشاء مشروع جديد في [Firebase Console](https://console.firebase.google.com)
   - قم بتفعيل خدمات Authentication و Cloud Firestore
   - قم بتحميل ملف `google-services.json` لنظام Android
   - قم بتحميل ملف `GoogleService-Info.plist` لنظام iOS
   - قم بتحديث بيانات الاتصال في `lib/config/firebase_config.dart`

2. تثبيت التطبيق محلياً:
   ```bash
   flutter pub get
   flutter run
   ```

3. بناء نسخة الإنتاج:
   
   لنظام Android:
   ```bash
   flutter build appbundle
   ```
   
   لنظام iOS:
   ```bash
   flutter build ipa
   ```

## النشر على المتاجر

### Google Play Store
1. قم بإنشاء حساب مطور على Google Play Console
2. أنشئ تطبيق جديد
3. ارفع ملف app bundle من مجلد `build/app/outputs/bundle/release`
4. أكمل معلومات صفحة المتجر وانشر التطبيق

### App Store
1. قم بإنشاء حساب Apple Developer
2. أنشئ معرف تطبيق جديد في App Store Connect
3. استخدم Xcode لرفع ملف IPA
4. أكمل معلومات صفحة المتجر وانشر التطبيق

## الأمان والخصوصية
- تأكد من إضافة سياسة الخصوصية
- قم بتفعيل Firebase Security Rules
- احمِ مفاتيح API 