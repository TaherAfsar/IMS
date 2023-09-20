import 'dart:convert';

class Report {
  String? id;
  dynamic itemId;
  String? reportDetails;
  String? reportStatus;
  dynamic reportImage;
  DateTime? createdDate;

  Report({
    this.id,
    this.itemId,
    this.reportDetails,
    this.reportStatus,
    this.reportImage,
    this.createdDate,
  });

  factory Report.fromRawJson(String str) => Report.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Report.fromJson(Map<String, dynamic> json) => Report(
        id: json["_id"],
        itemId: json["itemId"],
        reportDetails: json["reportDetails"],
        reportStatus: json["reportStatus"],
        reportImage: json["reportImage"],
        createdDate: json["createdDate"] == null
            ? null
            : DateTime.parse(json["createdDate"]),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "itemId": itemId,
        "reportDetails": reportDetails,
        "reportStatus": reportStatus,
        "reportImage": reportImage,
        "createdDate": createdDate?.toIso8601String(),
      };
}
