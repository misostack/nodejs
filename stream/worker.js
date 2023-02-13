onmessage = function (e) {
  console.log("Worker: Message received from main script");
  if (e.data[0] === "start") {
    const evtSource = new EventSource("http://localhost:1337/events");
    evtSource.onopen = (e) => console.log("ES open");
    evtSource.onerror = (e) => console.log("ES error", e);
    evtSource.onmessage = (e) => console.log(e.data);
    evtSource.addEventListener(
      "ping",
      (event) => {
        console.log(event);
        event.data = null;
        event.type = null;
        const newData = JSON.parse(event.data);
        console.error("data", newData);
        postMessage(newData);
        evtSource.close();
      },
      false
    );
    // evtSource.onmessage = (event) => {
    //   console.log(event);
    //   const newData = JSON.parse(event.data);
    //   console.error("data", newData);
    //   postMessage(newData);
    // };
  }
};
