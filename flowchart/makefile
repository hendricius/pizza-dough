.PHONY: bake
bake: build_docker_image
	docker run -it -v $(PWD):/opt/repo pizza-dough /bin/bash -c "cd /opt/repo && make build_flowchart"
	docker run -v $(PWD):/imgs dpokidov/imagemagick -density 900 -trim /imgs/chart.pdf -quality 100 /imgs/chart.webp
	cp chart.webp ../calculator/app/assets/images/pizza-process.webp

.PHONY: build_docker_image
build_docker_image:
	docker build -t pizza-dough -f Dockerfile .

.PHONY: clean
clean:
	rm -f chart.aux
	rm -f chart.log
	rm -f chart.pdf
	rm -f chart.png
	rm -f chart.webp

.PHONY: build_flowchart
build_flowchart: clean
	pdflatex chart.tex
