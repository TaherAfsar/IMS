import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ims_qrapp/models/report.dart';
import 'package:ims_qrapp/providers/main_provider.dart';
import 'package:ims_qrapp/screens/home_screen.dart';

class MyWidget extends ConsumerStatefulWidget {
  const MyWidget({super.key});

  @override
  ConsumerState<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends ConsumerState<MyWidget> {
  @override
  Widget build(BuildContext context) {
    final myData = ref.watch(reportsProvider);
    return Scaffold(
      backgroundColor: Colors.blue[100],
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(
            255, 108, 184, 247), // Background color of the app bar
        elevation: 0, // Remove the shadow

        title: const Text(
          'You Are Welcome!',
          style: TextStyle(
            fontSize: 24.0, // Text size
            fontWeight: FontWeight.bold, // Text weight
          ),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Card(
                // Set the shape of the card using a rounded rectangle border with a 8 pixel radius
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                // Set the clip behavior of the card
                clipBehavior: Clip.antiAliasWithSaveLayer,
                // Define the child widgets of the card
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    // Display an image at the top of the card that fills the width of the card and has a height of 160 pixels
                    Image.asset(
                      "assets/home_screen.png",
                      height: 160,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    // Add a container with padding that contains the card's title, text, and buttons
                    Container(
                      padding: const EdgeInsets.fromLTRB(15, 15, 15, 0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          // Display the card's title using a font size of 24 and a dark grey color
                          Text(
                            "Equipment/Item Damaged?",
                            style: TextStyle(
                              fontSize: 24,
                              color: Colors.grey[800],
                            ),
                          ),
                          // Add a space between the title and the text
                          Container(height: 10),
                          // Display the card's text using a font size of 15 and a light grey color
                          Text(
                            "You can simply scan the QR code on the item and report it for repair..",
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.grey[700],
                            ),
                          ),
                          // Add a row with two buttons spaced apart and aligned to the right side of the card
                          Row(
                            children: <Widget>[
                              // Add a spacer to push the buttons to the right side of the card
                              const Spacer(),
                              // Add a text button labeled "SHARE" with transparent foreground color and an accent color for the text
                              // TextButton(
                              //   style: TextButton.styleFrom(
                              //     foregroundColor: Colors.transparent,
                              //   ),
                              //   child: const Text(
                              //     "SHARE",
                              //     style: TextStyle(color: Color(0xff00adb5)),
                              //   ),
                              //   onPressed: () {},
                              // ),
                              // Add a text button labeled "EXPLORE" with transparent foreground color and an accent color for the text
                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: Colors.transparent,
                                ),
                                child: const Text(
                                  "EXPLORE",
                                  style: TextStyle(color: Color(0xff00adb5)),
                                ),
                                onPressed: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (ctx) => const Mypage()));
                                },
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    // Add a small space between the card and the next widget
                    Container(height: 5),
                  ],
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              const Padding(
                padding: EdgeInsets.only(left: 28),
                child: Text(
                  "> My Reports",
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
                ),
              ),
              const SizedBox(
                height: 4,
              ),
              SizedBox(
                height: 300,
                // child: ListView.builder(
                //   scrollDirection: Axis.horizontal, // Horizontal scrolling
                //   itemCount: 10, // Number of cards you want to display
                //   itemBuilder: (BuildContext context, int index) {
                //     return const Padding(
                //       padding: EdgeInsets.all(8.0), // Add spacing between cards
                //       child: MyCardWidget(),
                //     );
                //   },
                // ),
                child: myData.when(
                  data: (reports) {
                    List myData = reports.map((e) => e).toList();

                    return ListView(
                      scrollDirection: Axis.horizontal,
                      children: myData.map((data) {
                        return GestureDetector(
                          onTap: () {
                            // Navigator.of(context).push(MaterialPageRoute(
                            //     builder: (ctx) =>
                            //         MovieDetailsScreen(movie: data)));
                          },
                          child: Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(24),
                            ),
                            color: Colors.white,
                            elevation: 0,
                            clipBehavior: Clip.hardEdge,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(16)),
                                  clipBehavior: Clip.hardEdge,
                                  child: Image.network(
                                    "http://192.168.151.85:4000/${data.reportImage}",
                                    width: 320,
                                    height: 200,
                                    fit: BoxFit.fill,
                                  ),
                                ),
                                const SizedBox(
                                  height: 12,
                                ),
                                Text(
                                  "   ${data.reportDetails}",
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 22),
                                  textAlign: TextAlign.start,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                SizedBox(
                                  width: 250,
                                  child: Text(
                                    "     ${data.reportStatus}",
                                    style: TextStyle(
                                        fontWeight: FontWeight.normal,
                                        fontSize: 14,
                                        color: Colors.black45.withOpacity(0.5)),
                                    textAlign: TextAlign.start,
                                    overflow: TextOverflow.ellipsis,
                                    // textWidthBasis: TextWidthBasis.parent,
                                  ),
                                )
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    );
                  },
                  error: (error, stackTrace) => Text(
                    error.toString(),
                  ),
                  loading: () => const Center(
                    child: CircularProgressIndicator(),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MyCardWidget extends StatelessWidget {
  const MyCardWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 200,
      padding: const EdgeInsets.all(10.0),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        color: Colors.blueGrey[300],
        elevation: 10,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const ListTile(
              leading: Icon(Icons.album, size: 60),
              title: Text(
                'Item Name!',
                style: TextStyle(fontSize: 30.0),
              ),
              subtitle: Text(
                'New Item is been procured',
                style: TextStyle(fontSize: 18.0),
              ),
            ),
            ButtonBar(
              children: <Widget>[
                ElevatedButton(
                  child: const Text('Acquired'),
                  onPressed: () {/* ... */},
                ),
                ElevatedButton(
                  child: const Text('Not Acquired'),
                  onPressed: () {/* ... */},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
