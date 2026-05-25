AFRAME.registerComponent('hoverable', {
    schema: {
        opacity: { default: 0.7 }
    },

    init: function () {
        var el = this.el;
        this.initialOpacity = 1.0;
        
        el.addEventListener('mouseenter', () => {
            var mesh = el.getObject3D('mesh');
            if (mesh && mesh.material) {
                this.initialOpacity = mesh.material.opacity;
                mesh.material.opacity = this.data.opacity;
                mesh.material.transparent = true;
                mesh.material.needsUpdate = true;
            }
        });

        el.addEventListener('mouseleave', () => {
            var mesh = el.getObject3D('mesh');
            if (mesh && mesh.material) {
                mesh.material.opacity = this.initialOpacity;
                mesh.material.needsUpdate = true;
            }
        });
    }
});

AFRAME.registerComponent('clickable', {
    schema: {
        name: { type: 'string', default: "nameless" },
        target_url: { type: 'string', default: "" }
    },

    init: function () {
        var self = this;
        var data = self.data;
        var el = this.el;

        el.addEventListener('mouseenter', function () {
            console.log("Aim to", data.name);
        });

        el.addEventListener('click', function () {
            console.log("Go to", data.target_url);
            if (data.target_url) {
                location.replace(data.target_url);
            }
        });

    }
});

AFRAME.registerComponent('info-block', {
    schema: {
        name: { type: 'string', default: "nameless" },
        target_id: { type: 'string', default: "unknown" }
    },

    init: function () {
        var self = this;
        var data = self.data;
        var el = this.el;

        el.addEventListener('mouseenter', function () {
            console.log("Aim to", data.name);
        });

        el.addEventListener('click', function () {
            var target = document.getElementById(data.target_id);
            if (target) {
                console.log("Show Object: ", data.target_id);
                target.setAttribute("visible", true);
            }
        });

        el.addEventListener('mouseleave', function () {
            var target = document.getElementById(data.target_id);
            if (target) {
                console.log("Hide Object: ", data.target_id);
                target.setAttribute("visible", false);
            }
        });

    }
});

// Zoom functionality
document.addEventListener('wheel', function (event) {
    var camera = document.querySelector('a-camera');
    if (!camera) return;
    
    var currentFov = camera.getAttribute('camera').fov;
    if (event.deltaY < 0) {
        currentFov = Math.max(30, currentFov - 1);  // Zoom in
    } else {
        currentFov = Math.min(100, currentFov + 1); // Zoom out
    }
    camera.setAttribute('camera', 'fov', currentFov);
});