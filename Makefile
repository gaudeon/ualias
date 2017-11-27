distdir=./dist
zipfile=$(distdir)/ualias.zip

clean:
	rm -rf $(distdir)

dist: clean
	mkdir -p $(distdir)
	zip -r -j $(zipfile) src
