import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ims_qrapp/api_services.dart';
import 'package:ims_qrapp/models/report.dart';

final reportsProvider = FutureProvider<List<Report>>((ref) async {
  return ApiServices().fetchReports();
});
