NAME="laure_richis_gUnicorn"
DJANGODIR=/perfume/back
SOCKFILE=/perfume/back/run/gunicorn.sock
USER=root
NUM_WORKERS=3
DJANGO_SETTINGS_MODULE=laure_richis.production
DJANGO_WSGI_MODULE=laure_richis.wsgi

echo "Starting $NAME as `whoami`"

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

exec /usr/local/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-

