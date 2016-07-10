#include<stdio.h>
#include<string.h>

#define DEBUG false

char word[100];
char filename[100];

int main( void ) {
  int order = 0;
  int count;
  if ( ! DEBUG ) {
    freopen( "dat.txt", "r", stdin );
  }
  while ( scanf( "%s%d", word, &count ) != -1 ) {
    order ++ ;
    if ( order > 100000 ) {
      break;
    }
    memset( filename, 0, sizeof( filename ) );
    sprintf( filename, "order/%d.json", order);
    if( ! DEBUG ) {
      freopen( filename, "w", stdout );
    } else {
      printf( "TO: %s\n", filename );
    }
    printf( "{\n\t\"order\": \"%d\"\n\t,\"word\": \"%s\"\n\t,\"count\": \"%d\"\n}\n", order, word, count );
    if ( ! DEBUG ) {
      fclose( stdout );
    }

    memset( filename, 0, sizeof( filename ) );
    sprintf( filename, "word/%s.json", word);
    if( ! DEBUG ) {
      freopen( filename, "w", stdout );
    } else {
      printf( "TO: %s\n", filename );
    }
    printf( "{\n\t\"order\": \"%d\"\n\t,\"word\": \"%s\"\n\t,\"count\": \"%d\"\n}\n", order, word, count );
    if ( ! DEBUG ) {
      fclose( stdout );
    }
  }
  if ( ! DEBUG ) {
    fclose( stdin );
  }
  return 0;
}
