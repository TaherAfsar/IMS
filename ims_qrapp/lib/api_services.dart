// import 'dart:convert';

import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:ims_qrapp/models/report.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiServices {
  Future<List<Report>> fetchReports() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString("token");
    print("here");
    final response = await http.get(
        Uri.parse("http://192.168.151.85:4000/report/getAllReports/"),
        headers: {"Authorization": "Bearer $token"});

    print(response.body);

    if (response.statusCode == 200) {
      // final Map<String, dynamic> data = json.decode(response.body);
      final List<dynamic> results = jsonDecode(response.body);

      return results.map((reportData) => Report.fromJson(reportData)).toList();
    } else {
      throw Exception('Failed to load reports');
    }
  }
}
