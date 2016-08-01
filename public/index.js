var apiKey = "Your API key here",
    app    = {
    controller : function() {
        var ctrl = this;

        ctrl.events = m.prop([]);
        ctrl.keyword = m.prop("");

        ctrl.findShows = function() {
            if(ctrl.keyword() === "") {
                ctrl.events([]);
                return;
            }

            TMAPI(apiKey).discovery.v2.attraction.all({
                keyword : ctrl.keyword()
            })
            .then(ctrl.events);
        };
    },

    view : function(ctrl) {
        return m("div", {
                class : "container"
            },
            m("h1", "FIND SHOWS"),
            m("form", { class : "pure-form" },
                m("input", {
                    onkeyup : function(e) {
                        ctrl.keyword(this.value);
                        ctrl.findShows();
                    }
                })
            ),
            ctrl.events().items ?
                m("ul", { class : "pure-g" },
                    ctrl.events().items.map((e) => {
                        return m("li", { class : "pure-u-1-4" },
                            m("h4",
                                m("a", {
                                        target : "_blank",
                                        href   : e.url
                                    },
                                    m("div", { class : "img" },
                                        m("img", { src : e.images[0].url })
                                    ),
                                    e.name
                                ),
                                m("a", {
                                    class  : "tweet",
                                    target : "_blank",
                                    href   : `https://twitter.com/home?status=${encodeURIComponent(`I'm going to the ${e.name} show`)}`
                                }, "tweet show")
                            )
                        )
                    })
                ) : null
        );
    }
};

m.mount(document.getElementById("mount"), app);
