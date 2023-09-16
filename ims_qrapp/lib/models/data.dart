class ItemData {
  String? Id;
  String? name;
  String? category;
  String? entryDate;
  String? expirationDate;
  String? location;
  String? status;

  ItemData(
      {this.Id,
      this.name,
      this.category,
      this.entryDate,
      this.expirationDate,
      this.location,
      this.status});

  ItemData.fromJson(Map<String, dynamic> json) {
    Id = json['_id'];
    name = json['name'];
    category = json['category'];
    entryDate = json['entryDate'];
    expirationDate = json['expirationDate'];
    location = json['location'];
    status = json['status'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = Id;
    data['name'] = name;
    data['category'] = category;
    data['entryDate'] = entryDate;
    data['expirationDate'] = expirationDate;
    data['location'] = location;
    data['status'] = status;
    return data;
  }
}
